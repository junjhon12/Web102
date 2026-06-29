import type { Pokemon } from "../App";

interface HistoryProps {
  history: Pokemon[];
}

export default function History({ history }: HistoryProps) {
  return (
    <div className="w-full md:w-1/4 p-6 bg-slate-800 border-r border-slate-700 overflow-y-auto max-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">History</h2>
      {history.length === 0 ? (
        <p className="text-slate-400 text-sm">Nothing seen yet...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((poke, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 bg-slate-700 rounded-lg"
            >
              <img
                src={poke.image}
                alt={poke.name}
                className="w-12 h-12 bg-slate-600 rounded-full object-cover"
              />
              <p className="capitalize font-semibold">{poke.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
