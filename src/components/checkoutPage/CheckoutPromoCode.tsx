import { useEffect, useState } from "react";
import type { Coupon } from "../../api/coupon/couponService";
import { useCoupon } from "../../hooks/useCoupon";

interface Props {
  appliedCoupon: Coupon | null;
}

const CheckoutPromoCode = ({ appliedCoupon }: Props) => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<Coupon | null>(
    appliedCoupon
  );

  const validPromoCodes = {
    CYBER20: { discount: 20, type: "percentage", description: "20% OFF" },
    NEON50: { discount: 50, type: "fixed", description: "$50 OFF" },
    MATRIX15: { discount: 15, type: "percentage", description: "15% OFF" },
    FUTURE30: { discount: 30, type: "fixed", description: "$30 OFF" },
  };

  const { removeCoupon, applyCoupon, isVerificationPending } = useCoupon();

  useEffect(() => {
    setAppliedPromo(appliedCoupon);
  }, [appliedCoupon]);

  const handleApplyCode = () => {
    applyCoupon(promoCode);
    setPromoCode("");
  };

  //   const handleKeyPress = (e) => {
  //     if (e.key === 'Enter') {
  //       handleApplyCode();
  //     }
  //   };

  return (
    <div className="border border-cyan-900 bg-black/60">
      {/* Header */}
      <div className="border-b border-cyan-900 p-4 bg-cyan-900/20">
        <h3 className="text-cyan-400 font-bold text-lg tracking-wide">
          PROMO CODE
        </h3>
      </div>

      <div className="p-4">
        {/* Applied Code Display */}
        {appliedPromo && (
          <div className="bg-green-900 bg-opacity-30 border border-green-500 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-green-400 font-bold text-sm">
                  ✓ CODE_APPLIED
                </div>
                <div className="text-green-300 mt-1">
                  {appliedPromo.code} - {appliedPromo.discountPercentage}% OFF
                </div>
              </div>
              <button
                onClick={removeCoupon}
                className="text-red-400 hover:text-red-300 font-bold px-3 py-1 border border-red-500 hover:border-red-400 transition-colors duration-200"
              >
                REMOVE
              </button>
            </div>
          </div>
        )}

        {/* Promo Code Input */}
        {!appliedPromo && (
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  //   onKeyPress={handleKeyPress}
                  placeholder="ENTER_PROMO_CODE"
                  className="w-full bg-black border border-cyan-500 px-4 py-3 text-cyan-300 placeholder-cyan-600 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                  disabled={isVerificationPending}
                />
                {isVerificationPending && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <button
                onClick={handleApplyCode}
                disabled={isVerificationPending}
                className="ml-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold px-6 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 tracking-wider"
              >
                APPLY
              </button>
            </div>

            {/* Error Message */}
            {/* {true && (
              <div className="bg-red-900 bg-opacity-30 border border-red-500 p-3">
                <div className="flex items-center space-x-2">
                  <div className="text-red-400">⚠</div>
                  <div className="text-red-300 text-sm">"INVALID_CODE"</div>
                </div>
              </div>
            )} */}

            {/* Available Codes Hint */}
            <div className="mt-4 p-3 border border-cyan-900 bg-cyan-900/20">
              <div className="text-cyan-600 text-xs mb-2">
                // AVAILABLE_CODES:
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-cyan-500">CYBER20 - 20% OFF</div>
                <div className="text-cyan-500">NEON50 - $50 OFF</div>
                <div className="text-cyan-500">MATRIX15 - 15% OFF</div>
                <div className="text-cyan-500">FUTURE30 - $30 OFF</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPromoCode;
