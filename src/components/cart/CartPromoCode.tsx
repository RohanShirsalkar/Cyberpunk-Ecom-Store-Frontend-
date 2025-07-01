import { Gift, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCoupon } from "../../hooks/useCoupon";
import type { Coupon } from "../../api/coupon/couponService";

interface Props {
  appliedCoupon: Coupon | null;
}

const CartPromoCode = ({ appliedCoupon }: Props) => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<Coupon | null>(
    appliedCoupon
  );

  const { applyCoupon, removeCoupon } = useCoupon();

  useEffect(() => {
    setAppliedPromo(appliedCoupon);
  }, [appliedCoupon]);

  const handleApplyCoupon = () => {
    applyCoupon(promoCode);
    setPromoCode("");
  };

  return (
    <div className="bg-black bg-opacity-40 border border-purple-400 rounded-lg p-4 mt-6">
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
              - {appliedPromo.discountPercentage}% OFF
            </span>
          </div>
          <button
            onClick={removeCoupon}
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
            onClick={handleApplyCoupon}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded font-mono font-bold hover:from-purple-600 hover:to-pink-700 transition-all"
          >
            APPLY
          </button>
        </div>
      )}
      <p className="text-gray-400 font-mono text-xs mt-2">
        Try: CYBER25 or NEURAL50
      </p>
    </div>
  );
};

export default CartPromoCode;
