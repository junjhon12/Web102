const Gallery = ({ images }) => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Your Screenshot Gallery!</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="col-span-full text-center py-10 bg-gray-800 rounded-xl">
            <h3 className="text-xl text-gray-400">You haven't made a screenshot yet!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;