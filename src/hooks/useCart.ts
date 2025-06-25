import { useMutation } from "@tanstack/react-query"
import { addToCartById, removeProductById, updateCartProductQty } from "../api/cart/cartServices"
import { useDispatch, useSelector } from "react-redux"
import { showErrorToast, showInfoToast, showSuccessToast } from "../store/app/appSlice";
import useAppDispatch from "./useAppDispatch";
import { fetchCart, resetCart } from "../store/cart/cartSlice";
import { getAuthState } from "../store/auth/authSlice";

const useCart = () => {
    const { userId } = useSelector(getAuthState)

    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();

    const getCart = () => {
        appDispatch(fetchCart({ userId }))
    }

    const clearCart = () => {
        dispatch(resetCart())
    }

    const addToCart = useMutation({
        mutationFn: addToCartById,
        onSuccess: (res) => {
            dispatch(showSuccessToast({ title: "ADDED", message: res.message }));
            getCart()
        },
        onError: (err) => {
            console.log(err);
            dispatch(showErrorToast({ title: "Not Added", message: err.message }));
        },
    });

    const updateQuantity = useMutation({
        mutationFn: updateCartProductQty,
        onSuccess: () => {
            getCart()
        },
        onError: (err) => {
            console.log(err)
            dispatch(showErrorToast({ title: "ERROR OCCURED", message: err.message }))
        }
    })

    const removeFomCart = useMutation({
        mutationFn: removeProductById,
        onSuccess: () => {
            getCart()
            dispatch(showInfoToast({ title: "REMOVED", message: "Product removed from cart" }));
        },
        onError: (err) => {
            console.log(err)
            dispatch(showErrorToast({ title: "ERROR OCCURED", message: err.message }))
        }
    })


    return { updateQuantity, addToCart, removeFomCart, getCart, clearCart }

}

export default useCart
