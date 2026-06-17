import { useState } from "react";
import RecipeChoices from "./recipeChoices";
import drinksJson from "./drinks.json";

const BaristaForm = () => {
  const onNewDrink = () => {
    setInputs({
      temperature: "",
      milk: "",
      syrup: "",
      blended: "",
    });

    getNextDrink();
  };
  const onCheckAnswer = () => {};
  const getNextDrink = () => {
    // eslint-disable-next-line react-hooks/purity
    const randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
    setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
  };
  const [inputs, setInputs] = useState({
    temperature: "",
    milk: "",
    syrup: "",
    blended: "",
  });
  const ingredients = {
    temperature: ["hot", "lukewarm", "cold"],
    syrup: ["mocha", "vanilla", "toffee", "maple", "caramel", "other", "none"],
    milk: ["cow", "oat", "goat", "almond", "none"],
    blended: ["yes", "turbo", "no"],
  };
  const [currentDrink, setCurrentDrink] = useState("");
  const [trueRecipe, setTrueRecipe] = useState({});
  return (
    <div>
      <form>// we will fill this in soon!</form>

      <h3>Temperature</h3>
      <div className="answer-space">{inputs["temperature"]}</div>
      <RecipeChoices
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }))
        }
        label="temperature"
        choices={ingredients["temperature"]}
        checked={inputs["temperature"]}
      />
      <h3>Syrup</h3>
      <div className="answer-space">{inputs["syrup"]}</div>
      <RecipeChoices
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }))
        }
        label="syrup"
        choices={ingredients["syrup"]}
        checked={inputs["syrup"]}
      />
      <h3>Milk</h3>
      <div className="answer-space">{inputs["milk"]}</div>
      <RecipeChoices
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }))
        }
        label="milk"
        choices={ingredients["milk"]}
        checked={inputs["milk"]}
      />
      <h3>Blended</h3>
      <div className="answer-space">{inputs["blended"]}</div>
      <RecipeChoices
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }))
        }
        label="blended"
        choices={ingredients["blended"]}
        checked={inputs["blended"]}
      />
      <button className="button submit" onClick={onCheckAnswer}>
        Check Answer
      </button>

      <button className="button newdrink" onClick={onNewDrink}>
        New Drink
      </button>
    </div>
  );
};

export default BaristaForm;
