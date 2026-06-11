import { useState } from 'react'
import upgradesData from './components/Upgrades'
import UpgradeCard from './components/UpgradeCard'
import samosa from './assets/Samosa.jpg'

function App() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const handleSamosaClick = () => setCount(prev => prev + multiplier)

  const buyUpgrade = (cost: number, upgradeMultiplier: number) => {
    if (count >= cost) {
      setCount(prev => prev - cost)
      setMultiplier(prev => prev * upgradeMultiplier)
    } else {
      alert("Not enough samosas! Keep clicking.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 font-sans">
      
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900 tracking-tight">Samosa Selector</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-8">Count: {count}</h2>
        
        <button 
          onClick={handleSamosaClick}
          className="focus:outline-none focus-visible:ring-4 ring-orange-400 rounded-full transition-transform hover:scale-110 active:scale-95"
        >
          <img 
            src = {samosa} 
            alt="Samosa" 
            className="h-15 w-15 object-contain drop-shadow-xl cursor-pointer" 
          />
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-6 max-w-3xl">
        {upgradesData.map((upgrade, index) => (
          <UpgradeCard 
            key={index}
            name={upgrade.name}
            description={upgrade.description}
            cost={upgrade.cost}
            multiplier={upgrade.multiplier}
            buttonLabel={upgrade.button}
            onBuy={() => buyUpgrade(upgrade.cost, upgrade.multiplier)}
          />
        ))}
      </div>  

    </div>
  )
}

export default App