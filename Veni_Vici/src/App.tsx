import { useState } from "react";
import Discover from "./components/Discover";
import BanList from "./components/BanList";
import History from "./components/History";
import "./App.css";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  weight: string;
  height: string;
}

function App() {
  // 2. Strongly type our state variables
  const [currentPoke, setCurrentPoke] = useState<Pokemon | null>(null);
  const [banList, setBanList] = useState<string[]>([]);
  const [history, setHistory] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    let found = false;
    let attempts = 0;

    while (!found && attempts < 20) {
      attempts++;
      const randomId = Math.floor(Math.random() * 1025) + 1;

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`,
        );
        const data = await response.json();

        const types: string[] = data.types.map(
          (t: { type: { name: string } }) => t.type.name,
        );
        const weight = `${data.weight} hg`;
        const height = `${data.height} dm`;

        const attributes = [...types, weight, height];
        const isBanned = attributes.some((attr) => banList.includes(attr));

        if (!isBanned) {
          const newPoke: Pokemon = {
            id: data.id,
            name: data.name,
            image:
              data.sprites.front_default ||
              data.sprites.other["official-artwork"].front_default,
            types: types,
            weight: weight,
            height: height,
          };

          setCurrentPoke(newPoke);
          setHistory((prevHistory) => [newPoke, ...prevHistory]);
          found = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (!found) {
      alert(
        "Too many attributes banned! Unban some items to discover more Pokémon.",
      );
    }
    setLoading(false);
  };

  const toggleBan = (attribute: string) => {
    if (banList.includes(attribute)) {
      setBanList(banList.filter((item) => item !== attribute));
    } else {
      setBanList([...banList, attribute]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col md:flex-row">
      <History history={history} />
      <Discover
        currentPoke={currentPoke}
        fetchRandomPokemon={fetchRandomPokemon}
        toggleBan={toggleBan}
        loading={loading}
      />
      <BanList banList={banList} toggleBan={toggleBan} />
    </div>
  );
}

export default App;
