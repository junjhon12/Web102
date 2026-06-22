import "./App.css";
import FlashCardDeck from "./components/FlashCardDeck";
import Cards from "./data/cards";

function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 py-10 px-4">
      <div className="text-center max-w-xl px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
          Fullstack Interview Questions
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500">
          Test your knowledge across frontend, backend, databases, and
          networking. Click a card to reveal the answer.
        </p>
        <p className="mt-1 text-xs sm:text-sm text-gray-400">
          {Cards.length} cards total
        </p>
      </div>
      <div className="w-full flex justify-center">
        <FlashCardDeck flashcards={Cards} />
      </div>
    </main>
  );
}

export default App;
