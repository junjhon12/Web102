interface UpgradeCardProps {
  name: string;
  description: string;
  cost: number;
  multiplier: number;
  buttonLabel: string;
  onBuy: () => void;
}

export default function UpgradeCard({ name, description, buttonLabel, onBuy }: UpgradeCardProps) {
  return (
    <div className="flex flex-col justify-between border border-gray-300 p-5 w-52 rounded-xl shadow-sm bg-white hover:border-gray-400 hover:shadow-md transition-all">
      <div>
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      </div>
      <button 
        onClick={onBuy}
        className="w-full rounded-lg py-2 px-4 font-medium bg-gray-900 text-white hover:bg-black active:scale-95 transition-transform"
      >
        {buttonLabel}
      </button>
    </div>
  )
}