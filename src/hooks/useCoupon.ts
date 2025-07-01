import { useMutation } from "@tanstack/react-query";
import { verifyCoupon } from "../api/coupon/couponService";
import { showErrorToast, showSuccessToast } from "../store/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCartState, setAppliedCoupon, setCartTotalAfterDiscount } from "../store/cart/cartSlice";

export function useCoupon() {
    const dispatch = useDispatch()
    const { totalItmes } = useSelector(getCartState)

    const { mutate: mutateVerifyCoupon, isPending: isVerificationPending, isError: isVerificationFailed } = useMutation({
        mutationKey: ["verify-coupon"],
        mutationFn: verifyCoupon,
        onSuccess: (res) => {
            if (res.isValid) {
                dispatch(showSuccessToast({ title: "Coupon Applied", message: res.message }))
                dispatch(setAppliedCoupon(res.coupon))
                dispatch(setCartTotalAfterDiscount({ discount: res.coupon.discountPercentage }))
            } else {
                dispatch(showErrorToast({ title: "Invalid Coupon", message: res.message }))
            }
        },
        onError: (error) => {
            console.log(error)
            dispatch(showErrorToast({ title: "Server Error", message: error.message }))
        },
    })

    const applyCoupon = (code: string) => {
        if (totalItmes === 0) {
            dispatch(showErrorToast({ title: "Invalid request", message: "Cart is empty" }))
            return
        }
        if (code.trim() === "") {
            dispatch(showErrorToast({ title: "Invalid request", message: "Coupon code is required" }))
            return
        }
        mutateVerifyCoupon({ code });
    }

    const removeCoupon = () => {
        dispatch(setAppliedCoupon(null))
        dispatch(setCartTotalAfterDiscount({ discount: 0 }))
        // dispatch(showInfoToast({ title: "Coupon Removed", message: "Coupon removed" }))
    }

    return {
        applyCoupon,
        removeCoupon,
        isVerificationPending,
        isVerificationFailed
    };
}

