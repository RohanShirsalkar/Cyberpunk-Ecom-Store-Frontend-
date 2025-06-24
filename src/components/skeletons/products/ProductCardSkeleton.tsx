const ProductCardSkeleton = () => {
  return (
    <div className="w-full lg:max-w-xs rounded-xl border border-cyan-500 p-4 bg-black animate-pulse shadow-md">
      {/* Image Placeholder */}
      <div className="relative w-full h-48 bg-gray-800 rounded-md mb-4">
        <div className="absolute top-2 right-2 w-12 h-5 bg-gray-700 rounded-md" />
      </div>

      {/* Title Placeholder */}
      <div className="h-4 w-3/4 bg-gray-700 rounded mb-2"></div>

      {/* Category Placeholder */}
      <div className="h-3 w-1/3 bg-cyan-700 rounded mb-4"></div>

      {/* Price Placeholder */}
      <div className="h-6 w-1/2 bg-pink-700 rounded mb-4"></div>

      {/* Button Placeholder */}
      <div className="h-10 w-full rounded bg-gradient-to-r from-pink-500 to-purple-600 opacity-40"></div>
    </div>
  );
};

export default ProductCardSkeleton;
