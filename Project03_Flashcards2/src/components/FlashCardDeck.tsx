import FlashCard from "../components/FlashCard";
import type { Card } from "../data/cards";
import { useState } from "react";

interface FlashCardDeckProps {
  flashcards: Card[];
}

function FlashCardDeck({ flashcards }: FlashCardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const currentCard = flashcards[currentIndex];

  function handleCheckAnswer() {
    if (userAnswer.trim().toUpperCase() === currentCard.answer.toUpperCase()) {
      setIsCorrect(true);
    } else {
      setUserAnswer("");
    }
  }

  function goNext() {
    if (!isCorrect) return;

    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setIsCorrect(false);
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer("");
      setIsCorrect(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 px-4">
      <div
        className={`w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/5
             border-2 border-solid border-gray-200 rounded-2xl
             min-h-[160px] sm:min-h-[200px] md:min-h-[220px]
             flex items-center justify-center
             cursor-default hover:shadow-lg transition-shadow duration-200 relative
             ${isCorrect ? "bg-green-500" : "bg-white"}`}
      >
        <FlashCard card={currentCard} showCorrectAnswer={isCorrect} />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter choice (e.g. A)"
          maxLength={1}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isCorrect}
          className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto text-center disabled:bg-green-50 disabled:border-green-400 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          onClick={handleCheckAnswer}
          disabled={isCorrect || !userAnswer}
          className={`px-6 py-2 rounded-lg text-white font-medium transition-colors w-full sm:w-auto ${
            isCorrect
              ? "bg-green-500"
              : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          }`}
        >
          {isCorrect ? "Correct!" : "Check Answer"}
        </button>
      </div>

      <div className="flex justify-center gap-4 sm:gap-6">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="border-2 border-gray-200 px-6 py-2
                     text-sm sm:text-base md:text-lg font-medium
                     rounded-3xl
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-gray-100 active:scale-95
                     transition-all duration-150"
        >
          Prev
        </button>
        <button
          onClick={goNext}
          disabled={!isCorrect || currentIndex === flashcards.length - 1}
          className="border-2 border-gray-200 px-6 py-2
                     text-sm sm:text-base md:text-lg font-medium
                     rounded-3xl
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-gray-100 active:scale-95
                     transition-all duration-150"
        >
          Next
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 mt-2 w-full">
        <p className="text-sm sm:text-base text-gray-500 font-medium">
          {currentIndex + 1} / {flashcards.length}
        </p>
        <div className="w-48 sm:w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
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
