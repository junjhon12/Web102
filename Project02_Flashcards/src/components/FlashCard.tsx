import type { Card } from "../data/cards"

interface FlashCardProps {
    card: Card
    isFlipped: boolean
    onFlip: () => void
}

function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {
    return (
        <div
            onClick={onFlip}
            className="w-full px-5 py-6 sm:px-6 sm:py-8 flex flex-col gap-2"
        >
            <span className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">
                Card {card.id}
            </span>

            <p className={`
                text-sm sm:text-base md:text-lg
                leading-relaxed
                ${isFlipped ? "text-gray-600" : "text-gray-900 font-medium"}
            `}>
                {isFlipped ? card.answer : card.question}
            </p>
            <span className="mt-2 text-xs text-gray-300 self-end">
                {isFlipped ? "Answer" : "Question"}
            </span>
        </div>
    )
}

export default FlashCard