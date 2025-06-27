const AllProductsPageSkeleton = () => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
      <div
        className="flex flex-col lg:flex-row gap-8 p-6 animate-pulse text-white"
        aria-hidden="true"
      >
        {/* Left: Image Section */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="bg-gray-800 h-[400px] rounded-lg" />{" "}
          {/* Main image */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-16 h-16 bg-gray-700 rounded" />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          {/* Title and Category */}
          <div className="h-4 w-1/3 bg-gray-700 rounded" />
          <div className="h-6 w-3/4 bg-gray-600 rounded" />

          {/* Ratings */}
          <div className="h-4 w-24 bg-gray-700 rounded" />

          {/* Pricing */}
          <div className="flex items-center gap-4">
            <div className="h-6 w-20 bg-gray-600 rounded" />
            <div className="h-4 w-16 bg-gray-700 rounded" />
            <div className="h-4 w-12 bg-red-500 rounded" />
          </div>

          {/* Stock Info */}
          <div className="h-4 w-2/3 bg-green-700 rounded" />

          {/* Description */}
          <div className="space-y-2 mt-4">
            <div className="h-4 w-1/4 bg-gray-700 rounded" />
            <div className="h-3 w-full bg-gray-700 rounded" />
            <div className="h-3 w-5/6 bg-gray-700 rounded" />
          </div>

          {/* Features */}
          <div className="space-y-2 mt-4">
            <div className="h-4 w-1/4 bg-gray-700 rounded" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3 w-3/4 bg-pink-700 rounded" />
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 mt-4">
            <div className="h-4 w-24 bg-gray-700 rounded" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-700 rounded" />
              <div className="h-8 w-10 bg-gray-800 rounded" />
              <div className="h-8 w-8 bg-gray-700 rounded" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <div className="h-10 w-40 bg-pink-700 rounded" />
            <div className="h-10 w-10 bg-gray-700 rounded" />
            <div className="h-10 w-10 bg-gray-700 rounded" />
          </div>

          {/* Warning Box */}
          <div className="mt-4 p-4 bg-yellow-800 rounded">
            <div className="h-3 w-1/3 bg-yellow-500 rounded mb-2" />
            <div className="h-3 w-4/5 bg-yellow-600 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPageSkeleton;
