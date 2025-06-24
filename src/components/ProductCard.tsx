import { useMutation } from "@tanstack/react-query";
import type { Product } from "../api/models/ProductModel";
import { addToCart } from "../api/cart/cartServices";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "../store/auth/authSlice";
import ButtonSpinner from "./spinners/ButtonSpinner";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../store/app/appSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import { fetchCart, getCartState } from "../store/cart/cartSlice";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);

  const { cartItems } = useSelector(getCartState);
  const { userId, isLoggedIn } = useSelector(getAuthState);

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    for (let item of cartItems) {
      if (item._id === product._id) {
        console.log("YESSSSSS");
        setIsProductInCart(true);
      }
    }
  });

  const { mutate, status } = useMutation({
    mutationFn: () =>
      addToCart({ productId: product._id, quantity: 1, userId: userId }),
    onSuccess: (res) => {
      dispatch(showSuccessToast({ title: "Added", message: res.message }));
      appDispatch(fetchCart({ userId }));
    },
    onError: (err) => {
      console.log(err);
      dispatch(showErrorToast({ title: "Not Added", message: err.message }));
    },
  });

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      return dispatch(
        showInfoToast({
          title: "USER NOT LOGGED IN",
          message: "Please login to continue",
        })
      );
    }
    mutate();
  };

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

      {isProductInCart ? (
        <div className="flex items-center justify-center gap-2 mt-auto">
          {/* Decrement Button */}
          <button
            // onClick={decrement}
            // disabled={quantity <= 1}
            className={`
                flex-1 h-12 rounded font-bold text-lg transition-all duration-200 
                flex items-center justify-center border-2
                ${
                  quantity <= 1
                    ? "bg-slate-700 border-slate-600 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 text-white hover:from-purple-500 hover:to-pink-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25"
                }
              `}
          >
            <Minus className="w-5 h-5" />
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
            // onClick={increment}
            disabled={quantity >= 99}
            className={`
                h-12 rounded font-bold text-lg transition-all duration-200 
                flex flex-1 items-center justify-center border-2
                ${
                  quantity >= 99
                    ? "bg-slate-700 border-slate-600 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 text-white hover:from-purple-500 hover:to-pink-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25"
                }
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
          {status === "pending" ? <ButtonSpinner /> : "ADD_TO_CART"}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
