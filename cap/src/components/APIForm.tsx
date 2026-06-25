export default function APIForm({ inputs, handleChange, onSubmit }) {
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
      
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onSubmit}>
        {inputs &&
          Object.entries(inputs).map(([category, value], index) => (
            <div className="flex flex-col bg-gray-700 p-4 rounded-xl shadow-md" key={index}>
              <h3 className="text-lg font-semibold text-blue-300 capitalize mb-2">{category.replace(/_/g, ' ')}</h3>
              <input
                type="text"
                name={category}
                value={value}
                placeholder="Input this attribute..."
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <p className="text-sm text-gray-400 mt-3">{inputsInfo[index]}</p>
            </div>
          ))}
          
          <div className="md:col-span-2 flex justify-center mt-4">
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