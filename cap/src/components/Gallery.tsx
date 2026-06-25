import React from "react";

// WHY WE DO THIS: Tells TypeScript to enforce that the 'images' prop is specifically an array of strings.
interface GalleryProps {
  images: string[];
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-10">Your Screenshot Gallery!</h2>
      
      {/* WHY WE DO THIS: Tailwind CSS Grid allows us to build responsive layouts without writing media queries.
          1 column on mobile (default), 2 on medium screens (md:), and 3 on large desktop screens (lg:). */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Conditional Rendering: Only attempts to map over the array if it actually contains data. */}
        {images && images.length > 0 ? (
          images.map((pic, index) => (
            <div className="flex justify-center" key={index}>
              <img
                className="w-full h-auto object-cover rounded-xl shadow-md border border-slate-200 hover:shadow-xl transition-shadow duration-300"
                src={pic}
                alt={`Screenshot ${index + 1}`}
              />
            </div>
          ))
        ) : (
          
          // WHY WE DO THIS: A Fallback UI (Empty State) provides a better user experience.
          // If the gallery is empty, 'col-span-full' forces this message to stretch across the entire grid layout.
          <div className="col-span-full text-center py-12 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h3 className="text-xl font-medium text-slate-500">You haven't made a screenshot yet!</h3>
            <p className="text-slate-400 mt-2">Fill out the form above to capture your first image.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;