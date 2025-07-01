import { useEffect, useState } from "react";
import { ShoppingCart, Zap, Star, AlertTriangle } from "lucide-react";
import HeroSlider from "../components/ProductDetailsPage/HeroSlider";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/product/productServices";
import AllProductsPageSkeleton from "../components/skeletons/AllProductsPageSkeleton";
import { useSelector } from "react-redux";
import { getCartState } from "../store/cart/cartSlice";
import useCart from "../hooks/useCart";
import PageNotFound from "./PageNotFound";
import RecommendedProducts from "../components/ProductDetailsPage/RecommendedProducts";

type Params = {
  productId: string;
};

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  const { cartItems } = useSelector(getCartState);

  const { productId } = useParams<Params>();
  const {
    toggleCartDialog,
    handleAddToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const {
    data: product,
    // isError,
    isLoading,
  } = useQuery({
    queryKey: ["productDetails", productId],
    queryFn: () => getProductById(productId as string),
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      const cartItem = cartItems.find((item) => item._id === product?._id);
      if (cartItem) {
        setIsInCart(true);
        setQuantity(cartItem.productQty);
      } else {
        setIsInCart(false);
        setQuantity(1);
      }
    } else {
      setIsInCart(false);
      setQuantity(1);
    }

    // Cleanup function
    return () => {
      setIsInCart(false);
      setQuantity(1);
    };
  }, [cartItems, product]);

  const handleIncreaseQuantity = () => {
    if (!productId) return;
    if (!isInCart) {
      setQuantity((prev) => prev + 1);
    } else {
      increaseQuantity({ quantity, productId });
    }
  };
  const handleDecreaseQuantity = () => {
    if (!productId) return;
    if (!isInCart) {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    } else {
      decreaseQuantity({ quantity, productId });
    }
  };

  if (isLoading) {
    return <AllProductsPageSkeleton />;
  }

  if (!productId) {
    // Handle missing productId (e.g., show error or redirect)
    return <PageNotFound />;
  }

  return (
    <div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 font-mono text-sm">
          <div className="flex items-center space-x-2 text-cyan-300">
            <span>&gt;</span>
            <a href="#" className="hover:text-pink-400 transition-colors">
              HOME
            </a>
            <span>/</span>
            <a href="#" className="hover:text-pink-400 transition-colors">
              PRODUCTS
            </a>
            <span>/</span>
            <a href="#" className="hover:text-pink-400 transition-colors">
              {product?.category}
            </a>
            <span>/</span>
            <span className="text-white">{product?.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <HeroSlider product={product} />
          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-cyan-400 font-mono text-sm">
                  [{product?.category}]
                </span>
              </div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 font-mono mb-4">
                {product?.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(4)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="text-cyan-300 font-mono ml-2">
                    {product?.rating}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-pink-400 font-mono">
                  {product?.price}₵
                </span>
                <span className="text-xl text-gray-500 line-through font-mono">
                  {product?.mrp}₵
                </span>
                {/* <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-mono">
                  SAVE{" "}
                  {Math.round(
                    ((product?.mrp - product?.price) /
                      product?.mrp) *
                      100
                  )}
                  %
                </span> */}
              </div>
            </div>

            {/* Stock Status */}
            <div className="bg-black bg-opacity-40 border border-green-400 rounded p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-mono">
                    AVAILABLE_FOR_PURCHASE
                  </span>
                </div>
                <span className="text-cyan-400 font-mono">
                  {product?.inStockValue} units in stock
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-mono">
                PRODUCT_DESCRIPTION
              </h3>
              <p className="text-cyan-200 leading-relaxed font-mono text-sm">
                {product?.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-mono">
                KEY_FEATURES
              </h3>
              <ul className="space-y-2">
                {product?.features.split("\n").map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-cyan-300 font-mono text-sm"
                  >
                    <Zap className="h-4 w-4 text-pink-400" />
                    <span>&gt; {feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-white font-mono">QUANTITY:</span>
                <div className="flex items-center border border-cyan-400 rounded">
                  <button
                    onClick={handleDecreaseQuantity}
                    className="px-3 py-2 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all font-mono"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-white font-mono bg-black">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQuantity}
                    className="px-3 py-2 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all font-mono"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleAddToCart({ quantity, productId })}
                  disabled={isInCart}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded font-mono font-bold transition-all duration-300 ${
                    isInCart
                      ? "bg-green-500 text-black"
                      : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border border-pink-400"
                  }`}
                >
                  {/* <ShoppingCart className="h-5 w-5" /> */}
                  <span>{isInCart ? "ADDED_TO_CART" : "> ADD_TO_CART"}</span>
                </button>

                {isInCart && (
                  <button
                    onClick={toggleCartDialog}
                    className="px-6 py-4 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black rounded font-mono font-bold transition-all duration-300"
                  >
                    <ShoppingCart className="h-5 w-5 mx-auto" />
                  </button>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-yellow-500 bg-opacity-20 border border-yellow-400 rounded p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-400 font-mono font-bold">
                  NEURAL_WARNING
                </span>
              </div>
              <p className="text-yellow-200 font-mono text-xs">
                This device requires proper neural calibration. Unauthorized
                modifications may void warranty and cause synaptic damage.
              </p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <RecommendedProducts
          productId={productId}
          category={product?.category || ""}
        />
        {/* <InfoTabs product={product} /> */}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
