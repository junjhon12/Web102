// This component receives the 'prevImages' array from App.tsx via the 'images' prop
const Gallery = ({ images }) => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Your Screenshot Gallery!</h2>
      
      {/* Tailwind grid configuration: 1 column on mobile, 2 on tablets, 3 on large desktop screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Conditional Rendering: Only map over the images if the array exists and is not empty */}
        {images && images.length > 0 ? (
          images.map((pic, index) => (
            <div className="flex justify-center" key={index}>
              <img
                className="w-full h-auto object-cover rounded-xl shadow-lg border-4 border-gray-700 hover:scale-105 transition-transform duration-300"
                src={pic}
                alt={`Screenshot ${index + 1}`}
              />
            </div>
          ))
        ) : (
          
          // Fallback UI if the user hasn't generated any screenshots yet. col-span-full forces it to take up the whole grid width.
          <div className="col-span-full text-center py-10 bg-gray-800 rounded-xl">
            <h3 className="text-xl text-gray-400">You haven't made a screenshot yet!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;