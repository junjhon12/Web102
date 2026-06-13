# Fullstack Interview Flashcards

An interactive flashcard app for studying fullstack engineering interview topics. Built with React, TypeScript, and Tailwind CSS.

---

## Features

- **Flip interaction** — click any card to toggle between the question and answer
- **Random next card** — the Next button selects a random card from the deck to keep study sessions non-linear
- **Progress bar** — tracks your position through the deck at a glance
- **Responsive layout** — adapts from mobile through widescreen using Tailwind breakpoints

---

## Topics Covered

The deck includes 15 cards across these areas:

| Area | Topics |
|---|---|
| **Frontend** | SSR vs CSR, React hooks, Virtual DOM, useMemo / useCallback |
| **APIs** | REST vs GraphQL, HTTP status codes, CORS |
| **Backend** | Node.js event loop, TCP vs UDP |
| **Databases** | Indexing, SQL vs NoSQL, Normalization |
| **Security** | Authentication vs Authorization, JWTs |
| **DevOps** | CI/CD |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/flashcard-app.git
cd flashcard-app

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## Project Structure

```
src/
├── components/
│   ├── FlashCard.tsx        # Single card display with flip logic
│   └── FlashCardDeck.tsx    # Deck container, navigation, progress bar
├── data/
│   └── cards.ts             # Card data (questions + answers)
├── App.tsx                  # Root layout and header
├── App.css                  # Tailwind import
└── main.tsx                 # React entry point
```

---

## Adding Cards

Open `src/data/cards.ts` and add a new object to the `cards` array:

```ts
{
    id: 16,
    question: "Your question here?",
    answer: "Your answer here."
}
```

Cards are automatically picked up by the deck — no other changes needed.

---

## Built With

- [React](https://react.dev) — UI framework
- [TypeScript](https://www.typescriptlang.org) — type safety
- [Vite](https://vitejs.dev) — build tool and dev server
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling