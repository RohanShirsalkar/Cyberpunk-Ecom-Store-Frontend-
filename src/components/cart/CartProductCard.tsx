import { useEffect, useState } from "react";
import type { CartItem } from "../../api/models/cartModel";
import { Minus, Plus } from "lucide-react";
import useCart from "../../hooks/useCart";
import { useSelector } from "react-redux";
import { getAuthState } from "../../store/auth/authSlice";
import { getCartState } from "../../store/cart/cartSlice";

const CartProductCard = ({ item }: { item: CartItem }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { userId, isLoggedIn } = useSelector(getAuthState);
  const { cartItems } = useSelector(getCartState);

  const { updateQuantity, removeFomCart } = useCart();

  useEffect(() => {
    if (cartItems.length > 0) {
      for (let cartitem of cartItems) {
        if (cartitem._id === item._id) {
          setQuantity(cartitem.productQty);
        }
      }
    }
  }, [cartItems, isLoggedIn]);

  const increaseQuantity = () => {
    updateQuantity.mutate({
      productId: item._id,
      productQty: quantity + 1,
      userId,
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity.mutate({
        productId: item._id,
        productQty: quantity - 1,
        userId,
      });
    } else {
      removeFomCart.mutate({ productId: item._id, userId });
    }
  };

  return (
    <div
      key={item._id}
      className="bg-black bg-opacity-60 border border-gray-700 rounded-lg p-4 hover:border-cyan-400 transition-all"
    >
      <div className="flex flex-col sm:flex-row items-center space-x-4">
        {/* item Image */}
        <div className="relative">
          <img
            src={item.img}
            alt={item.name}
            className="w-20 h-20 object-cover rounded border border-gray-600"
          />
        </div>

        {/* item Info */}
        <div className="flex-1">
          <h4 className="text-white font-mono font-bold">{item.name}</h4>
          <p className="text-cyan-400 font-mono text-sm text-center sm:text-start">
            [{item.category}]
          </p>
          <div className="flex items-center justify-center md:justify-normal space-x-2 mt-1">
            <span className="text-pink-400 font-mono font-bold">
              {item.price}₵
            </span>
            <span className="text-gray-500 line-through font-mono text-sm">
              {item.price}₵
            </span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={decreaseQuantity}
            className="w-8 h-8 bg-black border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all rounded font-mono flex items-center justify-center"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-white font-mono bg-black border border-gray-600 rounded py-1">
            {quantity}
          </span>
          <button
            onClick={increaseQuantity}
            className="w-8 h-8 bg-black border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all rounded font-mono flex items-center justify-center"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Total & Remove */}
        <div className="text-right">
          <p className="text-xl font-bold text-pink-400 font-mono">
            {(parseFloat(item.price) * 1).toFixed(2)}₵
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
