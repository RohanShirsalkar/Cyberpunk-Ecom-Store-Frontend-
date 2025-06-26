import {
  X,
  ShoppingCart,
  CreditCard,
  Shield,
  Zap,
  CreditCardIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCartState, toggleCart } from "../../store/cart/cartSlice";
import CartProductCard from "./CartProductCard";

const CartDialog = () => {
  const { cartItems, totalItmes, cartTotal } = useSelector(getCartState);

  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center sm:p-4">
      <div className="bg-black bg-opacity-90 border-2 border-cyan-400 rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto shadow-2xl shadow-cyan-400/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-400">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 font-mono">
              CART
            </h2>
            <span className="text-green-400 font-mono text-sm">
              [{totalItmes} ITEMS]
            </span>
          </div>
          <button
            onClick={() => dispatch(toggleCart())}
            className="text-cyan-300 hover:text-pink-400 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-white font-mono mb-4">
              ACQUIRED_ITEMS:
            </h3>

            {cartItems?.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-cyan-300 font-mono">CART_EMPTY</p>
                <p className="text-gray-500 font-mono text-sm">
                  Initialize neural shopping protocol
                </p>
              </div>
            ) : (
              cartItems?.map((item) => (
                <CartProductCard key={item._id} item={item} />
              ))
            )}

            {/* Promo Code Section */}
            {/* <div className="bg-black bg-opacity-40 border border-purple-400 rounded-lg p-4 mt-6">
              <h4 className="text-white font-mono font-bold mb-3 flex items-center space-x-2">
                <Gift className="h-5 w-5 text-purple-400" />
                <span>PROMO_CODES:</span>
              </h4>

              {appliedPromo ? (
                <div className="flex items-center justify-between bg-green-500 bg-opacity-20 border border-green-400 rounded p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 font-mono font-bold">
                      {appliedPromo.code}
                    </span>
                    <span className="text-green-300 font-mono">
                      -
                      {appliedPromo.type === "percentage"
                        ? `${appliedPromo.discount}%`
                        : `${appliedPromo.discount}₵`}
                    </span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="ENTER_CODE..."
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-black bg-opacity-50 text-cyan-100 placeholder-gray-500 font-mono px-3 py-2 rounded border border-purple-400 focus:outline-none focus:border-pink-400"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded font-mono font-bold hover:from-purple-600 hover:to-pink-700 transition-all"
                  >
                    APPLY
                  </button>
                </div>
              )}
              <p className="text-gray-400 font-mono text-xs mt-2">
                Try: CYBER25 or NEURAL50
              </p>
            </div> */}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-black bg-opacity-60 border border-cyan-400 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white font-mono mb-4">
                ORDER_SUMMARY:
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-cyan-300 font-mono">
                  <span>Subtotal:</span>
                  <span>{cartTotal}₵</span>
                </div>

                {/* {savings > 0 && (
                  <div className="flex justify-between text-green-400 font-mono">
                    <span>You Saved:</span>
                    <span>-9999₵</span>
                  </div>
                )} */}

                {/* {appliedPromo && (
                  <div className="flex justify-between text-green-400 font-mono">
                    <span>Promo ({appliedPromo.code}):</span>
                    <span>-{promoDiscount.toFixed(2)}₵</span>
                  </div>
                )} */}

                <div className="flex justify-between text-cyan-300 font-mono">
                  <span>Neural Tax:</span>
                  <span>99₵</span>
                </div>

                <div className="flex justify-between text-cyan-300 font-mono">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>

                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between text-pink-400 font-mono font-bold text-lg">
                    <span>TOTAL:</span>
                    <span>{cartTotal}₵</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-green-500 bg-opacity-20 border border-green-400 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-mono font-bold">
                  SECURE_TRANSACTION
                </span>
              </div>
              <p className="text-green-300 font-mono text-xs">
                256-bit quantum encryption active
              </p>
            </div>

            {/* Checkout Button */}
            <button
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded font-mono text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-400/30 border border-pink-400 flex items-center justify-center space-x-2"
              disabled={
                cartItems?.length === 0 ||
                cartItems?.some((item) => !item.inStockValue)
              }
            >
              <CreditCard className="h-5 w-5" />
              <span>INITIALIZE_CHECKOUT</span>
            </button>

            {/* Quick Actions */}
            {/* <div className="grid grid-cols-2 gap-3">
              <button className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black py-2 px-4 rounded font-mono font-bold transition-all">
                SAVE_CART
              </button>
              <button className="bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black py-2 px-4 rounded font-mono font-bold transition-all">
                SHARE_LIST
              </button>
            </div> */}

            {/* Delivery Info */}
            <div className="text-center text-cyan-300 font-mono text-xs space-y-2">
              <div>
                <Zap className="h-4 w-4 inline-block mr-1" />
                Fast delivery available
              </div>
              <div>
                <CreditCardIcon className="h-4 w-4 inline-block mr-1" />
                Cash on delivery available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDialog;
