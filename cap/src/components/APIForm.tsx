import React from "react";

// Mirror the interface from App.tsx so this component knows what 'inputs' looks like
interface InputsState {
  url: string;
  format: string;
  no_ads: string;
  no_cookie_banners: string;
  width: string;
  height: string;
}

// WHY WE DO THIS: Defines the exact props this component receives. 
// This prevents prop-drilling errors and tells TypeScript that handleChange and onSubmit are event functions.
interface APIFormProps {
  inputs: InputsState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function APIForm({ inputs, handleChange, onSubmit }: APIFormProps) {
  
  // A helper array mapping human-readable descriptions to the inputs object.
  const inputsInfo = [
    "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
    "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
    "Input true or false if you would like your website screenshot to not contain any ads",
    "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
    "Choose the width of your screenshot (in pixels)",
    "Choose the height of your screenshot (in pixels)",
  ];

  return (
    <div className="max-w-5xl mx-auto my-8 p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">Select Your Image Attributes:</h2>
      
      {/* WHY WE DO THIS: Attaching onSubmit to the <form> tag (instead of just placing an onClick on the button) 
          is a crucial accessibility and UX practice. It ensures users can naturally submit the form by hitting the "Enter" key on their keyboard! */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onSubmit}>
        
        {/* WHY WE DO THIS: Object.entries turns our inputs dictionary into an array so we can map over it.
            This prevents us from having to hardcode 6 nearly identical HTML input blocks manually. */}
        {inputs &&
          Object.entries(inputs).map(([category, value], index) => (
            
            // React requires a unique 'key' when mapping over arrays to efficiently track changes in the Virtual DOM
            <div className="flex flex-col bg-slate-50 p-5 rounded-xl border border-slate-100" key={index}>
              
              {/* Uses regex replace() to swap underscores with spaces (e.g., 'no_ads' -> 'no ads') for cleaner UI */}
              <h3 className="text-lg font-bold text-slate-700 capitalize mb-2">{category.replace(/_/g, ' ')}</h3>
              
              <input
                type="text"
                name={category} // Connects the input to the state updater logic in App.tsx
                value={value as string} // Asserts value as string to satisfy TypeScript
                placeholder="Input this attribute..."
                onChange={handleChange}
                className="p-3 rounded-lg bg-white text-slate-900 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
              />
              {/* Renders the helper text based on the current loop index */}
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{inputsInfo[index]}</p>
            </div>
          ))}
          
          <div className="md:col-span-2 flex justify-center mt-6">
            {/* The type="submit" attribute natively links this button to the form's onSubmit event */}
            <button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-full shadow hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Take that Pic! 🎞
            </button>
          </div>
      </form>
    </div>
  );
}