import type { Product } from "../api/models/ProductModel";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "../store/auth/authSlice";
import ButtonSpinner from "./spinners/ButtonSpinner";
import { showInfoToast } from "../store/app/appSlice";
import { getCartState } from "../store/cart/cartSlice";
import { useEffect, useState } from "react";
import { Minus, Plus, Star } from "lucide-react";
import useCart from "../hooks/useCart";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const { userId, isLoggedIn } = useSelector(getAuthState);
  const { cartItems } = useSelector(getCartState);

  const { updateQuantity, addToCart, removeFomCart } = useCart();

  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems.length > 0) {
      for (let item of cartItems) {
        if (item._id === product._id) {
          setIsProductInCart(true);
          setQuantity(item.productQty);
        }
      }
      const isNotInCart = !cartItems.some((item) => item._id === product._id);
      if (isNotInCart) {
        setIsProductInCart(false);
      }
    } else {
      setIsProductInCart(false);
      setQuantity(1);
    }
  }, [cartItems, isLoggedIn]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      return dispatch(
        showInfoToast({
          title: "USER NOT LOGGED IN",
          message: "Please login to continue",
        })
      );
    }
    addToCart.mutate({ userId, productId: product._id, quantity: quantity });
  };

  const increaseQuantity = () => {
    updateQuantity.mutate({
      productId: product._id,
      productQty: quantity + 1,
      userId,
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity.mutate({
        productId: product._id,
        productQty: quantity - 1,
        userId,
      });
    } else {
      removeFomCart.mutate({ productId: product._id, userId });
    }
  };

  return (
    <div
      key={product._id}
      className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-6 border border-cyan-400 hover:border-pink-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/20 group"
    >
      <NavLink to={`/product-details/${product._id}`}>
        <div className="relative mb-4">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-48 object-cover rounded border border-gray-600 group-hover:border-cyan-400 transition-all duration-300"
          />
        </div>
        <h4 className="text-xl font-bold text-white mb-2 font-mono">
          {product.name}
        </h4>
        <p className="text-cyan-400 font-mono text-sm mb-2">
          [{product.category}]
        </p>
        <div className="flex items-center justify-start space-x-2 mb-2">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-400"
                }`}
              />
            ))}
          </div>
          <span className="text-slate-300 text-sm font-medium">
            {product.rating}
          </span>
          {/* <span className="text-slate-400 text-xs">(2,847 reviews)</span> */}
        </div>
        <p className="text-3xl font-bold text-pink-400 mb-4 font-mono">
          {product.price}₵
        </p>
      </NavLink>

      {isProductInCart ? (
        <div className="flex items-center justify-center gap-2 mt-auto">
          {/* Decrement Button */}
          <button
            name="minus"
            onClick={decreaseQuantity}
            // disabled={quantity <= 1}
            className={`
                h-12 rounded font-bold text-lg transition-all duration-200 
                flex flex-1 items-center justify-center border-2
                bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 text-white hover:from-purple-500 hover:to-pink-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25
              `}
          >
            <Minus className="w-5 h-5 " />
          </button>

          {/* Quantity Display/Input */}
          <div className="relative">
            <input
              type="number"
              value={quantity}
              // onChange={handleInputChange}
              min="1"
              max="99"
              className={`
                  flex-1 h-12 bg-slate-700 border-2 border-slate-600 rounded 
                  text-white text-xl font-bold text-center
                  focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50
                  transition-all duration-200
                `}
            />
          </div>

          {/* Increment Button */}
          <button
            name="plus"
            onClick={increaseQuantity}
            disabled={quantity >= 99}
            className={`
                h-12 rounded font-bold text-lg transition-all duration-200 
                flex flex-1 items-center justify-center border-2
                bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 text-white hover:from-purple-500 hover:to-pink-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25
              `}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded font-mono transition-all duration-300 border border-pink-400 hover:shadow-lg hover:shadow-pink-400/30"
        >
          {addToCart.status === "pending" ? <ButtonSpinner /> : "ADD_TO_CART"}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
