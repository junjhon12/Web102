import type { Pokemon } from "../App";

interface DiscoverProps {
  currentPoke: Pokemon | null;
  fetchRandomPokemon: () => void;
  toggleBan: (attribute: string) => void;
  loading: boolean;
}

export default function Discover({
  currentPoke,
  fetchRandomPokemon,
  toggleBan,
  loading,
}: DiscoverProps) {
  return (
    <div className="w-full md:w-2/4 p-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-extrabold mb-2 text-white">Veni Vici!</h1>
      <p className="text-slate-400 mb-8">
        Discover random Pokémon. Click attributes to ban them from appearing
        again!
      </p>

      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md min-h-100 flex flex-col items-center justify-center border border-slate-700">
        {currentPoke ? (
          <>
            <h2 className="text-3xl font-bold capitalize mb-4 text-amber-300">
              {currentPoke.name}
            </h2>
            <img
              src={currentPoke.image}
              alt={currentPoke.name}
              className="w-48 h-48 drop-shadow-2xl mb-4 bg-slate-700 rounded-full p-4"
            />

            {/* Clickable Attributes */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {currentPoke.types.map((type, i) => (
                <button
                  key={i}
                  onClick={() => toggleBan(type)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-semibold transition-colors cursor-pointer"
                >
                  {type}
                </button>
              ))}
              <button
                onClick={() => toggleBan(currentPoke.weight)}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded-full text-sm font-semibold transition-colors cursor-pointer"
              >
                {currentPoke.weight}
              </button>
              <button
                onClick={() => toggleBan(currentPoke.height)}
                className="px-3 py-1 bg-teal-600 hover:bg-teal-500 rounded-full text-sm font-semibold transition-colors cursor-pointer"
              >
                {currentPoke.height}
              </button>
            </div>
          </>
        ) : (
          <p className="text-xl text-slate-500">
            Click the button below to start your journey!
          </p>
        )}
      </div>

      <button
        onClick={fetchRandomPokemon}
        disabled={loading}
        className="mt-8 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-bold text-xl rounded-xl shadow-lg transition-transform active:scale-95"
      >
        {loading ? "Searching..." : "🔀 Discover!"}
      </button>
    </div>
  );
}
