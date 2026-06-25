Build Your Own Screenshot! 📸
📝 Project Description
This project is an interactive, API-driven React application built for the CodePath Web102: Intermediate Web Development course. It allows users to dynamically generate custom screenshots of any website using the ApiFlash API. Users can customize the image format, dimensions, and configure advanced settings like stripping away ads or cookie consent banners before the screenshot is taken.

✨ Features
Custom Configurations: Collects user inputs for URL, format (jpeg/png/webp), width, height, and ad/cookie removal.

Live Query Status: Displays a real-time mock of the URL query string being built before submission.

Screenshot Rendering: Fetches and displays the generated image seamlessly using asynchronous API calls.

Interactive Gallery: Saves all previously generated screenshots in the current session to a responsive grid gallery.

API Quota Tracking (Stretch Goal): Makes a secondary API call to track and display the remaining monthly ApiFlash queries.

Modern UI: Fully styled using Tailwind CSS with dark-mode aesthetics, responsive grids, and animated hover states.

🛠️ Technologies Used
React (Hooks: useState)

Vite (Build Tool)

Tailwind CSS v4 (Utility-first styling)

ApiFlash API (Screenshot generation & Quota tracking)

🚀 How I Built This (Development Sequence)
Here is the sequential breakdown of how this application was constructed from scratch:

Step 1: Project Setup & Environment Configuration
Initialized a new React environment using Vite.

Installed and configured Tailwind CSS using the modern Vite plugin setup, removing the need for PostCSS files.

Secured my ApiFlash Access Key by creating a .env file (VITE_APP_ACCESS_KEY) and referencing it via import.meta.env to ensure it isn't exposed in public repositories.

Step 2: State Management & Form Creation (APIForm.tsx)
Established a comprehensive inputs state dictionary in App.tsx to track all 6 required screenshot parameters.

Built the APIForm component and implemented top-down data flow by passing inputs, handleChange, and onSubmit as props.

Iterated over the state object using Object.entries().map() to dynamically generate the input fields.

Refactored the DOM structure to ensure semantic HTML (replacing invalid <li> tags with <div> containers) and configured the <form> wrapper to properly handle keyboard "Enter" submissions.

Step 3: Query Assembly & Asynchronous API Fetching
Built a robust submitForm handler with error catching to alert users if the URL field is submitted empty.

Implemented logic to inject default values (e.g., 1920x1080 dimensions) if the user leaves fields blank.

Bypassed React's asynchronous state delays by passing the updated inputs object directly into a makeQuery helper function.

Assembled the complex query string via template literals and executed a fetch() request within an async/await block (callAPI).

Step 4: Conditional Rendering & The Gallery (Gallery.tsx)
Added conditional rendering using ternary operators to display either the returned screenshot or a live "Current Query Status" text block depending on the presence of image data.

Created a prevImages state array and pushed every successful API return into it.

Built the Gallery component to accept the array as a prop, mapping over the strings to generate an ongoing visual history of the user's queries. Included fallback UI if the array is empty.

Step 5: Responsive Styling (Replacing Vanilla CSS)
Discarded traditional, bulky CSS stylesheets in favor of Tailwind CSS utility classes.

Implemented a dark-theme color palette (bg-gray-900 / bg-gray-800).

Added CSS Grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3) to ensure both the form inputs and the image gallery stack perfectly on mobile and align side-by-side on desktop.

Applied drop shadows, border radiuses, and hover scale animations to elevate the user interface.

Step 6: Quota Tracker Stretch Goal & Final Polish
Met the lab's stretch requirement by creating a secondary getQuota async function targeting ApiFlash's /quota endpoint.

Tied this function to the successful completion of a screenshot fetch, ensuring the data is always up-to-date.

Rendered the quota dynamically in an absolute-positioned badge locked to the top right of the viewport.

Added comprehensive inline documentation throughout App.tsx, APIForm.tsx, and Gallery.tsx to explain state flow, API logic, and component architecture for future maintainability.

💻 Local Installation
To run this project locally on your machine:

Clone the repository:

Bash
git clone https://github.com/junjhon12/Web102.git
Navigate into the project directory:

Bash
cd cap
Install the dependencies:

Bash
npm install
Create a .env file in the root directory and add your ApiFlash key:

Code snippet
VITE_APP_ACCESS_KEY="your_api_key_here"
Start the Vite development server:

Bash
npm run dev