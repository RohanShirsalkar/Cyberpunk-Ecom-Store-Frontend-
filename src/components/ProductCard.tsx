import type { Product } from "../api/models/ProductModel";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div
      key={product._id}
      className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-6 border border-cyan-400 hover:border-pink-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/20 group"
    >
      <div className="relative mb-4">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-48 object-cover rounded border border-gray-600 group-hover:border-cyan-400 transition-all duration-300"
        />
        {/* Add rating here */}
        {/* <div
          className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-mono font-bold ${
            product. === "ONLINE"
              ? "bg-green-500 text-black"
              : product.status === "LIMITED"
              ? "bg-yellow-500 text-black"
              : product.status === "HOT"
              ? "bg-red-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {product.status}
        </div> */}
      </div>
      <h4 className="text-xl font-bold text-white mb-2 font-mono">
        {product.name}
      </h4>
      <p className="text-cyan-400 mb-2 font-mono text-sm">
        [{product.category}]
      </p>
      <p className="text-3xl font-bold text-pink-400 mb-4 font-mono">
        {product.price}₵
      </p>
      <button
        // onClick={() => addToCart(product)}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded font-mono transition-all duration-300 border border-pink-400 hover:shadow-lg hover:shadow-pink-400/30"
      >
        &gt; ACQUIRE_TECH
      </button>
    </div>
  );
};

export default ProductCard;
