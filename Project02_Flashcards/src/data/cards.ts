export interface Card {
  id: number;
  question: string;
  answer: string;
}

const cards: Card[] = [
  {
    id: 1,
    question:
      "What is the difference between SSR (Server-Side Rendering) and CSR (Client-Side Rendering), and when would you use each?",
    answer:
      "SSR renders HTML on the server per request, sending a fully-formed page to the client — great for SEO and fast initial loads (e.g., Next.js). CSR renders in the browser via JavaScript after receiving a minimal HTML shell — better for highly interactive apps where SEO is less critical (e.g., a React SPA). Use SSR for public-facing, content-heavy pages; use CSR for dashboards or authenticated apps.",
  },
  {
    id: 2,
    question:
      "Explain the REST architectural constraints and how they differ from GraphQL.",
    answer:
      "REST uses stateless, resource-based URLs (e.g., GET /users/1) with fixed response shapes, often causing over-fetching or under-fetching. GraphQL exposes a single endpoint where clients query exactly the fields they need, reducing payload size and round trips. REST is simpler and more cacheable by default; GraphQL shines when clients have diverse data needs or you want to avoid multiple endpoints.",
  },
  {
    id: 3,
    question:
      "What is a database index, and what are the trade-offs of adding one?",
    answer:
      "An index is a data structure (commonly a B-tree) that speeds up read queries on a column by avoiding full table scans. Trade-offs: faster SELECTs but slower INSERTs/UPDATEs/DELETEs (the index must be maintained), and extra disk space. Index columns used frequently in WHERE, JOIN, or ORDER BY clauses; avoid indexing low-cardinality columns like boolean flags.",
  },
  {
    id: 4,
    question:
      "What is the event loop in Node.js, and how does it enable non-blocking I/O?",
    answer:
      "Node.js runs on a single thread but delegates I/O operations (file reads, DB queries, HTTP calls) to the OS or libuv's thread pool. The event loop continuously checks a queue of completed callbacks and executes them. Because the main thread never waits on I/O — it just registers a callback and moves on — Node can handle thousands of concurrent connections without spawning threads per request.",
  },
  {
    id: 5,
    question:
      "What is CORS, why does it exist, and how do you configure it on the server?",
    answer:
      "CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks web pages from making requests to a different origin (domain/port/protocol) than the one that served them. It exists to prevent malicious sites from silently hitting your API using a visitor's credentials. On the server, you allow specific origins by setting the Access-Control-Allow-Origin response header — e.g., in Express via the `cors` middleware with an origin whitelist.",
  },
  {
    id: 6,
    question:
      "What is the difference between authentication and authorization?",
    answer:
      "Authentication verifies who you are (e.g., checking a username/password or validating a JWT). Authorization determines what you're allowed to do once authenticated (e.g., role-based access control checking if a user has admin privileges). A common mistake is conflating the two — you can be authenticated but still unauthorized to access a specific resource.",
  },
  {
    id: 7,
    question:
      "What is a JWT, how does it work, and what are its security considerations?",
    answer:
      "A JSON Web Token is a base64-encoded, signed string with three parts: header (algorithm), payload (claims), and signature. The server signs the token with a secret or private key; the client stores it and sends it on subsequent requests. The server validates the signature without hitting a database, making JWTs stateless. Security concerns: store them in httpOnly cookies (not localStorage) to prevent XSS, use short expiry times, and never store sensitive data in the payload since it is only encoded, not encrypted.",
  },
  {
    id: 8,
    question:
      "Explain the difference between SQL and NoSQL databases. When would you choose one over the other?",
    answer:
      "SQL databases (e.g., PostgreSQL) store data in structured tables with strict schemas and support ACID transactions — ideal for relational data with complex queries. NoSQL databases (e.g., MongoDB, Redis) offer flexible schemas and horizontal scaling, trading some consistency for performance and scalability. Choose SQL for financial systems or anything requiring strong consistency and joins; choose NoSQL for high-throughput workloads, unstructured data, or when your schema evolves rapidly.",
  },
  {
    id: 9,
    question: "What is a React hook, and what are the rules around using them?",
    answer:
      "Hooks are functions that let functional components tap into React state and lifecycle features (e.g., useState, useEffect, useContext). The two core rules: only call hooks at the top level of a component — never inside loops, conditionals, or nested functions — and only call them from React function components or custom hooks. These rules ensure hook call order remains stable across renders, which is how React maps state to the correct hook.",
  },
  {
    id: 10,
    question:
      "What is the difference between TCP and UDP, and when would you use each?",
    answer:
      "TCP (Transmission Control Protocol) is connection-oriented and guarantees ordered, reliable delivery via handshakes and acknowledgments — suited for HTTP, file transfers, and anything where data integrity matters. UDP (User Datagram Protocol) is connectionless and sends packets with no delivery guarantees — suited for real-time applications like video streaming, VoIP, or gaming where low latency matters more than perfect reliability.",
  },
  {
    id: 11,
    question:
      "What is database normalization, and when might you intentionally denormalize?",
    answer:
      "Normalization is the process of organizing a relational database to reduce redundancy and improve data integrity, typically through normal forms (1NF, 2NF, 3NF). Each piece of data lives in one place and is referenced via foreign keys. You might intentionally denormalize — duplicating data across tables — to reduce expensive JOIN operations in read-heavy workloads. Data warehouses and analytics systems commonly denormalize for query performance.",
  },
  {
    id: 12,
    question: "What is the virtual DOM in React and why does it exist?",
    answer:
      "The virtual DOM is an in-memory JavaScript representation of the real DOM. When state changes, React re-renders the virtual DOM, diffs it against the previous snapshot (reconciliation), and computes the minimal set of real DOM mutations needed. This exists because direct DOM manipulation is slow — batching and minimizing those operations through the virtual DOM significantly improves performance for dynamic UIs.",
  },
  {
    id: 13,
    question:
      "What are HTTP status code categories, and what do common ones mean?",
    answer:
      "Status codes fall into five categories: 1xx (informational), 2xx (success), 3xx (redirects), 4xx (client errors), 5xx (server errors). Key ones: 200 OK, 201 Created, 204 No Content, 301 Moved Permanently, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests, 500 Internal Server Error, 503 Service Unavailable.",
  },
  {
    id: 14,
    question: "What is CI/CD and what problems does it solve?",
    answer:
      "CI (Continuous Integration) is the practice of frequently merging code into a shared branch and running automated tests to catch integration bugs early. CD (Continuous Delivery/Deployment) extends this by automatically deploying passing builds to staging or production. Together they solve the 'integration hell' of large infrequent merges, reduce deployment risk through smaller incremental changes, and shorten the feedback loop between writing code and getting it to users.",
  },
  {
    id: 15,
    question:
      "What is memoization in the context of React, and when should you use useMemo and useCallback?",
    answer:
      "Memoization caches the result of an expensive computation so it isn't recalculated on every render. useMemo memoizes a computed value — use it when a calculation is expensive and its inputs change infrequently. useCallback memoizes a function reference — use it when passing callbacks to child components wrapped in React.memo to prevent unnecessary re-renders. Avoid overusing them; the memoization itself has overhead and adds complexity.",
  },
];

export default cards;
