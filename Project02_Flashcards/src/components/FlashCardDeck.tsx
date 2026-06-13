import FlashCard from "../components/FlashCard";
import type { Card } from "../data/cards";
import { useState } from "react";

interface FlashCardDeckProps {
  flashcards: Card[];
}

function FlashCardDeck({ flashcards }: FlashCardDeckProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function goNext() {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentIndex(randomIndex);
    setIsFlipped(false);
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  }

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 px-4">
      <div
        className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/5
                            border-2 border-solid rounded-2xl
                            min-h-[160px] sm:min-h-[200px] md:min-h-[220px]
                            flex items-center justify-center
                            cursor-pointer hover:shadow-lg transition-shadow duration-200"
      >
        <FlashCard
          card={flashcards[currentIndex]}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />
      </div>

      <div className="flex justify-center gap-4 sm:gap-6">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="border-2 px-4 py-2
                               text-sm sm:text-base md:text-lg
                               rounded-3xl
                               disabled:opacity-40 disabled:cursor-not-allowed
                               hover:bg-gray-100 active:scale-95
                               transition-all duration-150"
        >
          Prev
        </button>
        <button
          onClick={goNext}
          className="border-2 px-4 py-2
                               text-sm sm:text-base md:text-lg
                               rounded-3xl
                               hover:bg-gray-100 active:scale-95
                               transition-all duration-150"
        >
          Next
        </button>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-sm sm:text-base text-gray-500">
          {currentIndex + 1} / {flashcards.length}
        </p>
        <div className="w-40 sm:w-56 md:w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-500 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / flashcards.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FlashCardDeck;
