import { useEffect, useState } from "react";
import type { CartItem } from "../../api/models/cartModel";
import { Minus, Plus, Trash2 } from "lucide-react";
import useCart from "../../hooks/useCart";
import { useSelector } from "react-redux";
import { getCartState } from "../../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutProductCart = ({ item }: { item: CartItem }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { cartItems, totalItmes } = useSelector(getCartState);

  const navigate = useNavigate();

  useEffect(() => {
    if (totalItmes > 0) {
      const cartItem = cartItems.find((cartitem) => cartitem._id === item._id);
      if (cartItem) {
        setQuantity(cartItem.productQty);
      }
    }
  }, [cartItems, totalItmes, navigate]);

  return (
    <div key={item?._id} className="border border-cyan-900/50 p-4">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-cyan-900/20 border border-cyan-900 flex items-center justify-center">
          <div className="w-8 h-8 bg-cyan-400/20"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-cyan-400 font-bold text-sm mb-1">{item.name}</h3>
          <p className="text-cyan-600 text-xs mb-2">[{item.category}]</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  decreaseQuantity({ productId: item._id, quantity })
                }
                className="w-6 h-6 border border-cyan-900 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
              >
                <Minus className="w-3 h-3 mx-auto" />
              </button>
              <span className="text-cyan-400 w-8 text-center">
                {item?.productQty}
              </span>
              <button
                onClick={() =>
                  increaseQuantity({ productId: item._id, quantity })
                }
                className="w-6 h-6 border border-cyan-900 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
              >
                <Plus className="w-3 h-3 mx-auto" />
              </button>
            </div>
            <button
              onClick={() => removeFromCart({ productId: item._id })}
              className="text-red-400 hover:text-red-300 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-pink-400 font-bold">${item.price}</span>
            {item?.mrp > item.price && (
              <span className="text-cyan-600 line-through text-sm">
                ${item.mrp}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductCart;
