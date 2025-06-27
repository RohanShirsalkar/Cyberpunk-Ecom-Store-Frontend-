import { useMutation } from "@tanstack/react-query"
import { addToCartById, removeProductById, updateCartProductQty } from "../api/cart/cartServices"
import { useDispatch, useSelector } from "react-redux"
import { showErrorToast, showInfoToast, showSuccessToast } from "../store/app/appSlice";
import useAppDispatch from "./useAppDispatch";
import { fetchCart, resetCart, toggleCart } from "../store/cart/cartSlice";
import { getAuthState } from "../store/auth/authSlice";

const useCart = () => {
    const { userId, isLoggedIn } = useSelector(getAuthState)

    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();

    const toggleCartDialog = () => {
        dispatch(toggleCart())
    }

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


    const handleAddToCart = ({ productId, quantity }: { productId: string, quantity: number }) => {
        if (!isLoggedIn) {
            return dispatch(
                showInfoToast({
                    title: "USER NOT LOGGED IN",
                    message: "Please login to continue",
                })
            );
        }
        addToCart.mutate({ userId, productId, quantity: quantity });
    };

    const increaseQuantity = ({ productId, quantity }: { productId: string, quantity: number }) => {
        updateQuantity.mutate({
            productId,
            productQty: quantity + 1,
            userId,
        });
    };

    const decreaseQuantity = ({ productId, quantity }: { productId: string, quantity: number }) => {
        if (quantity > 1) {
            updateQuantity.mutate({
                productId,
                productQty: quantity - 1,
                userId,
            });
        } else {
            removeFomCart.mutate({ productId, userId });
        }
    };



    return { updateQuantity, addToCart, removeFomCart, getCart, clearCart, toggleCartDialog, handleAddToCart, increaseQuantity, decreaseQuantity }

}

export default useCart
