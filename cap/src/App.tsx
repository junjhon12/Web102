import { useState } from "react";
import "./App.css";
import APIForm from "./components/APIForm";
import Gallery from "./components/Gallery";

function App() {
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });
  const [quota, setQuota] = useState(null);

  const submitForm = (e) => {
    e.preventDefault(); 
    
    let defaultValues = {
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
          updatedInputs[key] = defaultValues[key];
        }
      }
      setInputs(updatedInputs);
      makeQuery(updatedInputs); 
    }
  };

  const makeQuery = (currentInputs) => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + currentInputs.url;

    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${currentInputs.format}&width=${currentInputs.width}&height=${currentInputs.height}&no_cookie_banners=${currentInputs.no_cookie_banners}&no_ads=${currentInputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;

    callAPI(query).catch(console.error);
  };

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    
    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      setCurrentImage(json.url);
      setPrevImages((images) => [...images, json.url]);
      reset();
      getQuota();
    }
  };

  const getQuota = async () => {
    const response = await fetch("https://api.apiflash.com/v1/urltoimage/quota?access_key=" + ACCESS_KEY);
    const result = await response.json();
    setQuota(result);
  }

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
      {/* Quota Tracker Fixed to Top Right */}
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

      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      
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

      <div className="max-w-6xl mx-auto border-t border-gray-700 pt-8">
        <Gallery images={prevImages} />
      </div>
    </div>
  );
}

export default App;