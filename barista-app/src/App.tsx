import BaristaForm from './components/BaristaForm';

function App() {
  return (
    <div className="font-sans text-center mt-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900">On My Grind</h1>
        <p className="text-gray-600 text-lg">So you think you can barista? Let's put that to the test...</p>
      </div>
      <BaristaForm />
    </div>
  );
}

export default App;