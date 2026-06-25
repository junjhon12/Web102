// This component renders the form fields dynamically based on the inputs state object.
// It receives inputs (state), handleChange (updater), and onSubmit (submission logic) via props.
export default function APIForm({ inputs, handleChange, onSubmit }) {
  
  // Array of helpful descriptions. The indexes align with the Object.entries(inputs) mapping below.
  const inputsInfo = [
    "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
    "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
    "Input true or false if you would like your website screenshot to not contain any ads",
    "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
    "Choose the width of your screenshot (in pixels)",
    "Choose the height of your screenshot (in pixels)",
  ];

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-gray-800 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Select Your Image Attributes:</h2>
      
      {/* Attaching onSubmit to the form tag itself ensures that hitting the "Enter" key on a keyboard triggers the submission! */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onSubmit}>
        
        {/* We use Object.entries to map over the keys/values of the inputs dictionary. */}
        {inputs &&
          Object.entries(inputs).map(([category, value], index) => (
            
            // React requires a unique 'key' when mapping over arrays to efficiently update the DOM
            <div className="flex flex-col bg-gray-700 p-4 rounded-xl shadow-md" key={index}>
              {/* Uses regex to replace underscores with spaces for a cleaner UI (e.g., 'no_ads' becomes 'no ads') */}
              <h3 className="text-lg font-semibold text-blue-300 capitalize mb-2">{category.replace(/_/g, ' ')}</h3>
              <input
                type="text"
                name={category} // The name attribute matches the state key, which the handleChange function relies on
                value={value}
                placeholder="Input this attribute..."
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {/* Renders the corresponding description using the current loop index */}
              <p className="text-sm text-gray-400 mt-3">{inputsInfo[index]}</p>
            </div>
          ))}
          
          <div className="md:col-span-2 flex justify-center mt-4">
            {/* The type="submit" attribute naturally ties this button to the form's onSubmit event */}
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105 cursor-pointer"
            >
              Take that Pic! 🎞
            </button>
          </div>
      </form>
    </div>
  );
}