import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { CartItem } from "../../api/models/cartModel";
import { getCartByUserId } from "../../api/cart/cartServices";
import type { Coupon } from "../../api/coupon/couponService";

interface CartState {
    isCartOpen: boolean;
    isLoading: boolean;
    error: string | null;
    totalItmes: number;
    cartTotal: string;
    discountAmount: string;
    discountedTotal: string;
    cartId: string;
    appliedCoupon: Coupon | null;
    cartItems: CartItem[]
}

const initialState: CartState = {
    isCartOpen: true,
    isLoading: false,
    error: null,
    totalItmes: 0,
    cartTotal: "0",
    discountAmount: "0",
    discountedTotal: "0",
    cartId: "",
    appliedCoupon: null,
    cartItems: []
}

export const fetchCart = createAsyncThunk('cart/fetchCart', getCartByUserId)

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen
        },
        setCart: (state, { payload }: PayloadAction<{ cartItems: CartItem[], cartId: string }>) => {
            state.cartId = payload.cartId;
            state.cartItems = payload.cartItems;
            state.totalItmes = payload.cartItems.length;
        },
        resetCart: (state) => {
            state.cartId = "";
            state.cartItems = [];
            state.cartId = "";
            state.cartTotal = "";
            state.totalItmes = 0;
            state.appliedCoupon = null;
            state.discountAmount = "0";
            state.discountedTotal = "0";
        },
        setAppliedCoupon: (state, { payload }: PayloadAction<Coupon | null>) => {
            state.appliedCoupon = payload;
        },
        setCartTotalAfterDiscount: (state, { payload }: PayloadAction<{ discount: number }>) => {
            if (payload.discount === 0) {
                state.discountAmount = "0";
                state.discountedTotal = state.cartTotal;
            } else {
                const cartTotalNum = parseFloat(state.cartTotal);
                const discountAmountNum = (cartTotalNum * payload.discount) / 100;
                state.discountAmount = discountAmountNum.toFixed(2);
                state.discountedTotal = (cartTotalNum - discountAmountNum).toFixed(2);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
            state.isLoading = false;

            // Update cart items and total
            state.cartItems = payload.cartItems;
            state.cartTotal = payload.cartTotal;

            // Calculate discount and discounted total if a coupon is applied
            const cartTotalNum = parseFloat(state.cartTotal);
            const discountPercentage = state.appliedCoupon?.discountPercentage ?? 0;
            const discountAmountNum = (cartTotalNum * discountPercentage) / 100;
            state.discountAmount = discountAmountNum.toFixed(2);
            state.discountedTotal = (cartTotalNum - discountAmountNum).toFixed(2);

            // Calculate total number of items in the cart
            state.totalItmes = payload.cartItems.reduce(
                (total, item) => total + item.productQty,
                0
            );
        })
        builder.addCase(fetchCart.rejected, (state, actions) => {
            console.log("cart error : ", actions.error);
            state.isLoading = false;
            state.error = "Error while fetching cart data"
        })

    }
})

const getDiscountedTotal = (cartTotal: string, discount: number = 0) => {
    const discountAmount = (parseFloat(cartTotal) * discount!) / 100;
    const discountedTotal = (parseFloat(cartTotal) - discountAmount).toFixed(2);
    return { discountAmount: discountAmount.toFixed(2), discountedTotal }
}

export const { toggleCart, resetCart, setAppliedCoupon, setCartTotalAfterDiscount } = cartSlice.actions
export const getCartState = (state: RootState) => state.cart
export default cartSlice.reducer;