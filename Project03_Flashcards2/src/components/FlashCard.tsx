import type { Card } from "../data/cards"

interface FlashCardProps {
    card: Card
    showCorrectAnswer: boolean
}

function FlashCard({ card, showCorrectAnswer }: FlashCardProps) {
    return (
        <div className="w-full h-full min-h-[200px] px-5 py-8 sm:px-8 sm:py-10 flex flex-col items-center justify-center relative">
            <span className="absolute top-4 left-4 text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">
                Card {card.id}
            </span>

            <div className="w-full max-w-xl flex flex-col gap-6 mt-4 mb-2">
                <p className="text-base sm:text-lg md:text-xl text-gray-900 font-semibold text-center leading-relaxed">
                    {card.question}
                </p>
                
                <div className="flex flex-col gap-3 w-full">
                    {card.choices.map((choice, index) => {
                        const isThisTheCorrectAnswer = choice.toUpperCase() === card.answer.toUpperCase();
                        
                        const bgColor = showCorrectAnswer && isThisTheCorrectAnswer 
                            ? "bg-green-500 border-green-600 text-white shadow-md" 
                            : "bg-gray-50 border-gray-200 text-gray-700";
                        
                        return (
                            <div 
                                key={index} 
                                className={`px-4 py-3 border-2 rounded-xl text-sm sm:text-base font-medium text-left transition-all duration-200 ${bgColor}`}
                            >
                                {choice}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default FlashCard