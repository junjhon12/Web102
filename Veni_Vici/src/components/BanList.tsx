interface BanListProps {
  banList: string[];
  toggleBan: (attribute: string) => void;
}

export default function BanList({ banList, toggleBan }: BanListProps) {
  return (
    <div className="w-full md:w-1/4 p-6 bg-slate-800 border-l border-slate-700 overflow-y-auto max-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-rose-400">Ban List</h2>
      <p className="text-sm text-slate-400 mb-4">
        Click an item below to unban it.
      </p>

      {banList.length === 0 ? (
        <p className="text-slate-500 italic">No attributes banned yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {banList.map((attr, index) => (
            <button
              key={index}
              onClick={() => toggleBan(attr)}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 rounded-full text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2"
            >
              {attr} <span className="text-xs">✕</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
