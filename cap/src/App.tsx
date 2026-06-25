import { useState } from "react";
import "./App.css";
import APIForm from "./components/APIForm";
import Gallery from "./components/Gallery";

// WHY WE DO THIS: Interfaces tell TypeScript exactly what shape our data should take.
// If a future developer tries to add a typo like 'with: string' instead of 'width', TypeScript will catch it immediately before the code even runs.
interface InputsState {
  url: string;
  format: string;
  no_ads: string;
  no_cookie_banners: string;
  width: string;
  height: string;
}

// Defines the exact structure we expect back from the ApiFlash quota endpoint
interface QuotaData {
  remaining: number;
  limit: number;
  reset?: number; 
}

function App() {
  // State to store the URL of the most recently fetched screenshot
  // We use <string | null> because the initial state is empty (null), but it will eventually hold a URL string.
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  
  // State to store an array of previously fetched screenshot URLs for the gallery
  const [prevImages, setPrevImages] = useState<string[]>([]);
  
  // WHY WE DO THIS: We store API keys in .env files and access them via import.meta.env
  // This prevents malicious actors from stealing the key if the code is uploaded to a public GitHub repository.
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY as string;
  
  // WHY WE DO THIS: Grouping all form inputs into a single object is much cleaner than creating 6 separate useState hooks. 
  // It makes passing data down to child components easier and keeps our state updates synchronized.
  const [inputs, setInputs] = useState<InputsState>({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });
  
  const [quota, setQuota] = useState<QuotaData | null>(null);

  // FormEvent<HTMLFormElement> tells TypeScript this function is specifically triggered by a form submission
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    // WHY WE DO THIS: e.preventDefault() stops the browser's default behavior of reloading the entire page when a form is submitted.
    e.preventDefault(); 
    
    // Fallback values ensure the API call succeeds even if the user lazily leaves non-essential fields blank.
    let defaultValues: Partial<InputsState> = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };

    if (inputs.url === "" || inputs.url === " ") {
      alert("You forgot to submit an url!");
    } else {
      const updatedInputs = { ...inputs };
      
      for (const [key, value] of Object.entries(inputs)) {
        if (value === "") {
          const typedKey = key as keyof InputsState;
          updatedInputs[typedKey] = defaultValues[typedKey] as string;
        }
      }
      
      setInputs(updatedInputs);
      
      // WHY WE DO THIS: We pass `updatedInputs` directly to `makeQuery` instead of just calling makeQuery().
      // React state updates (setInputs) are asynchronous. If we relied on the `inputs` state inside makeQuery, 
      // it might build the URL using old data before the state had time to update!
      makeQuery(updatedInputs); 
    }
  };

  const makeQuery = (currentInputs: InputsState) => {
    let wait_until = "network_idle";
    let response_type = "json"; // WHY WE DO THIS: Requesting a JSON response instead of an image blob makes error handling and conditional rendering much easier in React.
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + currentInputs.url;

    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${currentInputs.format}&width=${currentInputs.width}&height=${currentInputs.height}&no_cookie_banners=${currentInputs.no_cookie_banners}&no_ads=${currentInputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;

    callAPI(query).catch(console.error);
  };

  const callAPI = async (query: string) => {
    const response = await fetch(query);
    const json = await response.json();
    
    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      setCurrentImage(json.url);
      
      // WHY WE DO THIS: We use the spread operator [...] to take all existing images in the array and append the new one to the end.
      setPrevImages((images) => [...images, json.url]);
      reset();
      getQuota();
    }
  };

  // Secondary API call to fetch the user's remaining quota limit
  const getQuota = async () => {
    const response = await fetch("https://api.apiflash.com/v1/urltoimage/quota?access_key=" + ACCESS_KEY);
    const result = await response.json();
    setQuota(result); // Triggers a re-render to display the new quota badge
  }

  // Resets the form dictionary back to empty strings for the next use
  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-12 relative">
      
      {/* WHY WE DO THIS: Conditional rendering (quota && ...) ensures this badge doesn't try to render before the API data has been fetched, which would cause a crash. */}
      {quota && (
        <div className="absolute top-4 right-4 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm">
          <p className="text-sm font-semibold text-slate-600">
            Remaining API calls: <span className="text-indigo-600 font-bold">{quota.remaining}</span> / {quota.limit}
          </p>
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 mb-10 tracking-tight drop-shadow-md">
        Build Your Own Screenshot! 📸
      </h1>

      {/* WHY WE DO THIS: We use a top-down data flow. App.tsx holds the state, and we pass the updater functions down to APIForm as props. */}
      <APIForm
        inputs={inputs}
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputs((prevState) => ({
            ...prevState,
            // Uses dynamic bracket notation to target the specific input being typed in based on its 'name' attribute
            [e.target.name]: e.target.value.trim(), 
          }))
        }
        onSubmit={submitForm}
      />
      
      {/* Ternary Operator: If currentImage exists, show the image. Otherwise, show the live query status. */}
      {currentImage ? (
        <div className="flex justify-center mb-16 mt-8">
          <img
            className="max-w-full md:max-w-4xl h-auto rounded-xl shadow-lg border border-slate-200"
            src={currentImage}
            alt="Screenshot returned"
          />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-16 mt-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Current Query Status:</h3>
          <p className="text-sm font-mono text-slate-700 break-all bg-slate-100 p-5 rounded-lg border border-slate-200">
            https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY
            <br />
            &url={inputs.url} <br />
            &format={inputs.format} <br />
            &width={inputs.width} <br />
            &height={inputs.height} <br />
            &no_cookie_banners={inputs.no_cookie_banners} <br />
            &no_ads={inputs.no_ads} <br />
          </p>
        </div>
      )}

      <div className="max-w-6xl mx-auto border-t border-slate-200 pt-12">
        <Gallery images={prevImages} />
      </div>
    </div>
  );
}

export default App;