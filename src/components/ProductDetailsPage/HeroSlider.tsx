import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSlider = ({ product }: { product: any }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-black bg-opacity-60 rounded-lg border border-cyan-400 p-4">
        <img
          src={product.images[selectedImage]}
          alt={product.name}
          className="w-full h-96 object-cover rounded border border-gray-600"
        />
        <div className="absolute top-6 right-6 flex space-x-2">
          <div
            className={`px-3 py-1 rounded text-xs font-mono font-bold ${
              product.status === "ONLINE"
                ? "bg-green-500 text-black"
                : "bg-red-500 text-white"
            }`}
          >
            {product.status}
          </div>
        </div>
        {/* Image Navigation */}
        <button
          onClick={() =>
            setSelectedImage(
              selectedImage > 0 ? selectedImage - 1 : product.images.length - 1
            )
          }
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-cyan-400 p-2 rounded hover:bg-opacity-80 transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() =>
            setSelectedImage(
              selectedImage < product.images.length - 1 ? selectedImage + 1 : 0
            )
          }
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-cyan-400 p-2 rounded hover:bg-opacity-80 transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Thumbnail Images */}
      <div className="flex space-x-2">
        {product.images.map((image: string, index: number) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-20 h-20 rounded border-2 transition-all ${
              selectedImage === index
                ? "border-pink-400"
                : "border-gray-600 hover:border-cyan-400"
            }`}
          >
            <img
              src={image}
              alt={`View ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
