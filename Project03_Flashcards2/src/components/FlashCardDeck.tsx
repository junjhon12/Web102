import FlashCard from "../components/FlashCard";
import type { Card } from "../data/cards";
import { useState } from "react";

interface FlashCardDeckProps {
  flashcards: Card[];
}

function FlashCardDeck({ flashcards }: FlashCardDeckProps) {
  const [deck, setDeck] = useState<Card[]>(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredIds, setMasteredIds] = useState<number[]>([]);
  const activeDeck = deck.filter((card) => !masteredIds.includes(card.id));
  const currentCard = activeDeck[currentIndex];

  function resetValidation() {
    setUserAnswer("");
    setIsCorrect(false);
    setIsWrong(false);
  }

  function handleCheckAnswer() {
    if (!currentCard) return;

    const normalizedInput = userAnswer.trim().toUpperCase();
    const normalizedAnswer = currentCard.answer.toUpperCase();
    
    let isMatch = false;
    if (normalizedInput.length === 1 && normalizedAnswer.startsWith(normalizedInput)) {
      isMatch = true;
    } 
    else if (normalizedAnswer === normalizedInput) {
      isMatch = true;
    }
    else if (normalizedInput.length > 2 && normalizedAnswer.includes(normalizedInput)) {
      isMatch = true;
    }

    if (isMatch) {
      setIsCorrect(true);
      setIsWrong(false);
      
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      setIsWrong(true);
      setCurrentStreak(0);
    }
  }

  function goNext() {
    if (!isCorrect) return;

    if (currentIndex < activeDeck.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetValidation();
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetValidation();
    }
  }

  function handleShuffle() {
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);
    setCurrentIndex(0);
    resetValidation();
  }

  function handleMasterCard() {
    if (!currentCard) return;
    
    setMasteredIds((prev) => [...prev, currentCard.id]);
    resetValidation();
  
    if (currentIndex >= activeDeck.length - 1 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  // --- Empty State (All Cards Mastered) ---
  if (activeDeck.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[300px] gap-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-green-600">🎉 You've mastered all the cards! 🎉</h2>
        <p className="text-gray-500">Amazing job completing the deck.</p>
        <button 
          onClick={() => { 
            setMasteredIds([]); 
            setCurrentIndex(0); 
            resetValidation(); 
            setCurrentStreak(0);
          }}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium rounded-lg shadow-md"
        >
          Restart Deck
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 px-4">
      
      {/* Streak Counters */}
      <div className="w-full max-w-xl flex items-center px-2 text-sm sm:text-base font-bold text-gray-700 gap-4">
        <span className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full shadow-sm">
          Current Streak: {currentStreak}
        </span>
        <span className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full shadow-sm">
          Longest Streak: {longestStreak}
        </span>
      </div>

      {/* Flashcard Container */}
      <div
        className={`w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/5
             border-2 border-solid border-gray-200 rounded-2xl
             min-h-[160px] sm:min-h-[200px] md:min-h-[220px]
             flex items-center justify-center
             cursor-default hover:shadow-lg transition-all duration-300 relative
             ${isCorrect ? "bg-green-500 border-green-500 shadow-green-200" : "bg-white"}`}
      >
        <FlashCard card={currentCard} showCorrectAnswer={isCorrect} />
      </div>

      {/* Answer Input Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter choice or keyword"
          value={userAnswer}
          onChange={(e) => {
            setUserAnswer(e.target.value);
            setIsWrong(false); // Clear wrong styling when the user starts typing again
          }}
          disabled={isCorrect}
          className={`border-2 rounded-lg px-4 py-2 w-full sm:w-auto text-center transition-colors focus:outline-none
            disabled:bg-green-50 disabled:border-green-400 disabled:text-green-800 disabled:font-bold
            ${isWrong ? "border-red-500 bg-red-50 text-red-700 placeholder-red-300" : "border-gray-300 focus:border-blue-500 text-gray-800"}
          `}
        />
        <button
          onClick={handleCheckAnswer}
          disabled={isCorrect || !userAnswer}
          className={`px-6 py-2 rounded-lg text-white font-medium transition-colors w-full sm:w-auto ${
            isCorrect
              ? "bg-green-600 shadow-md"
              : isWrong
              ? "bg-red-500 hover:bg-red-600 shadow-md"
              : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          }`}
        >
          {isCorrect ? "Correct!" : isWrong ? "Try Again" : "Check Answer"}
        </button>
      </div>

      {/* Controls & Navigation Section */}
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 w-full max-w-2xl mt-2">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="border-2 border-gray-200 px-5 py-2 text-sm sm:text-base font-medium rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 active:scale-95 transition-all duration-150"
        >
          ← Prev
        </button>

        <button
          onClick={handleShuffle}
          className="bg-gray-100 border-2 border-gray-200 px-5 py-2 text-sm sm:text-base font-medium rounded-full hover:bg-gray-200 active:scale-95 transition-all duration-150"
        >
          🔀 Shuffle
        </button>

        <button
          onClick={handleMasterCard}
          className="bg-emerald-50 border-2 border-emerald-200 text-emerald-700 px-5 py-2 text-sm sm:text-base font-medium rounded-full hover:bg-emerald-100 active:scale-95 transition-all duration-150"
        >
          ✅ Mastered
        </button>

        <button
          onClick={goNext}
          disabled={!isCorrect || currentIndex === activeDeck.length - 1}
          className="border-2 border-gray-200 px-5 py-2 text-sm sm:text-base font-medium rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 active:scale-95 transition-all duration-150"
        >
          Next →
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col items-center gap-2 mt-4 w-full">
        <p className="text-sm sm:text-base text-gray-500 font-medium">
          {currentIndex + 1} / {activeDeck.length} {masteredIds.length > 0 && <span className="text-emerald-500 ml-1">({masteredIds.length} Mastered)</span>}
        </p>
        <div className="w-48 sm:w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / activeDeck.length) * 100}%` }}
          />
        </div>
      </div>
      
    </div>
  );
}

export default FlashCardDeck;