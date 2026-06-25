import { useState } from "react";
import "./App.css";
import APIForm from "./components/APIForm";
import Gallery from "./components/Gallery";

function App() {
  // State to store the URL of the most recently fetched screenshot
  const [currentImage, setCurrentImage] = useState(null);
  
  // State to store an array of previously fetched screenshot URLs for the gallery
  const [prevImages, setPrevImages] = useState([]);
  
  // Environment variable for the ApiFlash access key. Stored in .env to keep it secure from public repositories.
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  
  // State to manage all form inputs in a single object. 
  // This is cleaner than having 6 separate useState hooks and makes passing data to forms easier.
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });
  
  // State to store the user's remaining API quota limit
  const [quota, setQuota] = useState(null);

  // Handles form submission, prevents default page reload, and validates inputs before querying
  const submitForm = (e) => {
    e.preventDefault(); 
    
    // Default values fallback. This ensures the API call succeeds even if the user leaves fields blank.
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };

    // Validation: A URL is absolutely required for the API to work.
    if (inputs.url === "" || inputs.url === " ") {
      alert("You forgot to submit an url!");
    } else {
      // Create a shallow copy of the current inputs state to update
      const updatedInputs = { ...inputs };
      
      // Iterate through the inputs. If an input is empty, assign its respective default value.
      for (const [key, value] of Object.entries(inputs)) {
        if (value === "") {
          updatedInputs[key] = defaultValues[key];
        }
      }
      
      // Update state with the newly populated inputs
      setInputs(updatedInputs);
      
      // Call makeQuery with updatedInputs directly. 
      // We pass the argument directly because React's setInputs is asynchronous. 
      // If we just called makeQuery() and it relied on the `inputs` state, it might build the query using old data!
      makeQuery(updatedInputs); 
    }
  };

  // Constructs the specific query URL string required by the ApiFlash endpoint
  const makeQuery = (currentInputs) => {
    let wait_until = "network_idle";
    let response_type = "json"; // Request a JSON response instead of a direct image file for easier error handling in React
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + currentInputs.url;

    // Assemble the massive query string using template literals for readability
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${currentInputs.format}&width=${currentInputs.width}&height=${currentInputs.height}&no_cookie_banners=${currentInputs.no_cookie_banners}&no_ads=${currentInputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;

    // Execute the fetch call and catch any top-level promise rejections
    callAPI(query).catch(console.error);
  };

  // Asynchronous function to execute the fetch request
  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    
    // ApiFlash will return a null URL if it couldn't capture the screenshot
    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      // Update state with the new image URL to display it
      setCurrentImage(json.url);
      
      // Push the new image to the history array for the gallery using the spread operator
      setPrevImages((images) => [...images, json.url]);
      
      // Clear the form fields for the next query
      reset();
      
      // Fetch the updated quota limit now that a successful call has been made
      getQuota();
    }
  };

  // Asynchronous function to fetch the user's remaining API quota from a secondary endpoint
  const getQuota = async () => {
    const response = await fetch("https://api.apiflash.com/v1/urltoimage/quota?access_key=" + ACCESS_KEY);
    const result = await response.json();
    setQuota(result); // Updating this state will trigger a re-render to display the new quota badge
  }

  // Resets all form inputs back to empty strings
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
    <div className="min-h-screen bg-gray-900 text-white font-sans p-6 md:p-12 relative">
      
      {/* Quota Tracker Fixed to Top Right. Uses conditional rendering to only show if quota data exists. */}
      {quota && (
        <div className="absolute top-4 right-4 bg-gray-800 border border-gray-700 px-4 py-2 rounded-full shadow-lg">
          <p className="text-sm font-semibold text-blue-300">
            Remaining API calls: <span className="text-white">{quota.remaining}</span> / {quota.limit}
          </p>
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-10 drop-shadow-md">
        Build Your Own Screenshot! 📸
      </h1>

      {/* Form Component. Receives state and handler functions as props to enforce top-down data flow. */}
      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          // Dynamically updates the specific field in the inputs object based on the input's 'name' attribute
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      
      {/* Conditional Rendering: Show the returned image if it exists, otherwise show a live preview of the URL being built */}
      {currentImage ? (
        <div className="flex justify-center mb-12">
          <img
            className="max-w-full md:max-w-4xl h-auto rounded-2xl shadow-2xl border-4 border-blue-500/30"
            src={currentImage}
            alt="Screenshot returned"
          />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-md mb-12 border border-gray-700">
          <h3 className="text-xl font-bold text-blue-300 mb-4">Current Query Status:</h3>
          <p className="text-sm font-mono text-gray-300 break-all bg-gray-900 p-4 rounded-lg">
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

      {/* Gallery component mapped to the array of previous screenshots */}
      <div className="max-w-6xl mx-auto border-t border-gray-700 pt-8">
        <Gallery images={prevImages} />
      </div>
    </div>
  );
}

export default App;