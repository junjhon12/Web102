export interface Card {
  id: number;
  question: string;
  choices: string[];
  answer: string;
}

const cards: Card[] = [
  // --- Frontend ---
  {
    id: 1,
    question: "What is the primary purpose of the Virtual DOM in React?",
    choices: [
      "A. To directly manipulate the browser's DOM",
      "B. To securely store global state variables",
      "C. To optimize rendering by minimizing expensive real DOM updates",
      "D. To handle asynchronous API requests"
    ],
    answer: "C",
  },
  {
    id: 2,
    question: "Which React hook is specifically designed to handle side effects in a functional component?",
    choices: [
      "A. useState",
      "B. useEffect",
      "C. useReducer",
      "D. useMemo"
    ],
    answer: "B",
  },
  
  // --- Backend ---
  {
    id: 3,
    question: "What is the primary difference between the HTTP methods PUT and PATCH?",
    choices: [
      "A. PUT is for full resource replacement, while PATCH is for partial modifications.",
      "B. PUT is secure and encrypted, while PATCH is unencrypted.",
      "C. PUT is for partial modifications, while PATCH is for full resource replacement.",
      "D. There is no difference; they are interchangeable."
    ],
    answer: "A",
  },
  {
    id: 4,
    question: "In Node.js, which built-in module is used to create a basic web server?",
    choices: [
      "A. fs",
      "B. url",
      "C. path",
      "D. http"
    ],
    answer: "D",
  },

  // --- Databases ---
  {
    id: 5,
    question: "What does the acronym ACID stand for in the context of database transactions?",
    choices: [
      "A. Asynchronous, Concurrent, Isolated, Distributed",
      "B. Atomicity, Consistency, Isolation, Durability",
      "C. Association, Creation, Indexing, Deletion",
      "D. Accurate, Consistent, Independent, Durable"
    ],
    answer: "B",
  },
  {
    id: 6,
    question: "Which of the following is a defining characteristic of most NoSQL databases?",
    choices: [
      "A. Strict adherence to relational tables and foreign keys",
      "B. Schema-less or flexible data models",
      "C. Exclusively using SQL for complex queries",
      "D. Requiring rigid schema definitions before inserting data"
    ],
    answer: "B",
  },

  // --- Networking ---
  {
    id: 7,
    question: "Which layer of the OSI model is responsible for routing packets between different networks?",
    choices: [
      "A. Transport Layer",
      "B. Data Link Layer",
      "C. Network Layer",
      "D. Application Layer"
    ],
    answer: "C",
  },
  {
    id: 8,
    question: "What is the primary function of the Domain Name System (DNS)?",
    choices: [
      "A. To encrypt web traffic between a client and a server",
      "B. To cache frequently accessed web pages",
      "C. To translate human-readable domain names into IP addresses",
      "D. To assign dynamic IP addresses to devices on a local network"
    ],
    answer: "C",
  }
];

export default cards;