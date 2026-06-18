import { useState } from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "./drinks.json";

const BaristaForm = () => {
  const [inputs, setInputs] = useState({
    temperature: "",
    milk: "",
    syrup: "",
    blended: "",
  });

  const [currentDrink, setCurrentDrink] = useState("");
  const [trueRecipe, setTrueRecipe] = useState<any>({});

  const [correct_temp, setCheckedTemperature] = useState("");
  const [correct_syrup, setCheckedSyrup] = useState("");
  const [correct_milk, setCheckedMilk] = useState("");
  const [correct_blended, setCheckedBlended] = useState("");

  const ingredients = {
    temperature: ["hot", "lukewarm", "cold"],
    syrup: ["mocha", "vanilla", "toffee", "maple", "caramel", "other", "none"],
    milk: ["cow", "oat", "goat", "almond", "none"],
    blended: ["yes", "turbo", "no"],
  };

  const getNextDrink = () => {
    const randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
    setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
  };

  const onNewDrink = () => {
    setInputs({
      temperature: "",
      milk: "",
      syrup: "",
      blended: "",
    });
    
    setCheckedTemperature("");
    setCheckedSyrup("");
    setCheckedMilk("");
    setCheckedBlended("");

    getNextDrink();
  };

  const onCheckAnswer = () => {
    if (trueRecipe.temperature !== inputs["temperature"]) {
      setCheckedTemperature("wrong");
    } else {
      setCheckedTemperature("correct");
    }

    if (trueRecipe.syrup !== inputs["syrup"]) {
      setCheckedSyrup("wrong");
    } else {
      setCheckedSyrup("correct");
    }

    if (trueRecipe.milk !== inputs["milk"]) {
      setCheckedMilk("wrong");
    } else {
      setCheckedMilk("correct");
    }

    if (trueRecipe.blended !== inputs["blended"]) {
      setCheckedBlended("wrong");
    } else {
      setCheckedBlended("correct");
    }
  };

  // Helper function to dynamically apply Tailwind colors
  const getAnswerSpaceClass = (status: string) => {
    const baseClass = "w-36 h-10 flex items-center justify-center rounded-md font-bold mb-4 border-2 transition-colors ";
    if (status === "correct") return baseClass + "bg-green-100 text-green-800 border-green-500";
    if (status === "wrong") return baseClass + "bg-red-100 text-red-800 border-red-500";
    return baseClass + "bg-gray-100 border-transparent text-gray-800";
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hi, I'd like to order a:</h2>
      <div className="flex items-center justify-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-blue-700">{currentDrink}</h2>
        <button 
          type="button" 
          className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-xl" 
          onClick={onNewDrink}
        >
          🔄
        </button>
      </div>

      <form className="flex justify-evenly items-start mx-auto relative max-w-4xl">
        <div className="flex flex-col items-center mx-4">
          <h3 className="text-lg font-semibold mb-2">Temperature</h3>
          <div className={getAnswerSpaceClass(correct_temp)}>
            {inputs["temperature"]}
          </div>
          <RecipeChoices
            handleChange={(e: any) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="temperature"
            choices={ingredients["temperature"]}
            checked={inputs["temperature"]}
          />
        </div>

        <div className="flex flex-col items-center mx-4">
          <h3 className="text-lg font-semibold mb-2">Syrup</h3>
          <div className={getAnswerSpaceClass(correct_syrup)}>
            {inputs["syrup"]}
          </div>
          <RecipeChoices
            handleChange={(e: any) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="syrup"
            choices={ingredients["syrup"]}
            checked={inputs["syrup"]}
          />
        </div>

        <div className="flex flex-col items-center mx-4">
          <h3 className="text-lg font-semibold mb-2">Milk</h3>
          <div className={getAnswerSpaceClass(correct_milk)}>
            {inputs["milk"]}
          </div>
          <RecipeChoices
            handleChange={(e: any) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="milk"
            choices={ingredients["milk"]}
            checked={inputs["milk"]}
          />
        </div>

        <div className="flex flex-col items-center mx-4">
          <h3 className="text-lg font-semibold mb-2">Blended</h3>
          <div className={getAnswerSpaceClass(correct_blended)}>
            {inputs["blended"]}
          </div>
          <RecipeChoices
            handleChange={(e: any) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="blended"
            choices={ingredients["blended"]}
            checked={inputs["blended"]}
          />
        </div>
      </form>

      <div className="mt-10">
        <button 
          type="button" 
          className="px-6 py-3 mx-2 text-base font-bold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer" 
          onClick={onCheckAnswer}
        >
          Check Answer
        </button>

        <button 
          type="button" 
          className="px-6 py-3 mx-2 text-base font-bold text-white bg-blue-600 border border-blue-600 rounded-lg shadow-sm hover:bg-blue-700 cursor-pointer" 
          onClick={onNewDrink}
        >
          New Drink
        </button>
      </div>
    </div>
  );
};

export default BaristaForm;