const RecipeChoices = ({ handleChange, label, choices, checked }: any) => {
    return (
      <div className="mt-2 text-left">
        {choices &&
          choices.map((choice: string) => (
            <li key={choice} className="list-none mb-2">
              <label className="cursor-pointer flex items-center">
                <input
                  id={choice}
                  value={choice}
                  name={label}
                  type="radio"
                  onChange={handleChange}
                  checked={checked == choice}
                  className="mr-2 w-4 h-4 text-blue-600 cursor-pointer"
                />
                {choice}
              </label>
            </li>
          ))}
      </div>
    );
};

export default RecipeChoices;