import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { CartItem } from "../../api/models/cartModel";
import { getCartByUserId } from "../../api/cart/cartServices";

interface CartState {
    isCartOpen: boolean;
    isLoading: boolean;
    error: string | null;
    totalItmes: number;
    cartTotal: string;
    cartId: string;
    cartItems: CartItem[]
}

const initialState: CartState = {
    isCartOpen: false,
    isLoading: false,
    error: null,
    totalItmes: 0,
    cartTotal: "0",
    cartId: "",
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.cartItems = payload.cartItems;
            state.cartTotal = payload.cartTotal;
            state.totalItmes = payload.cartItems.length;
        })
        builder.addCase(fetchCart.rejected, (state, actions) => {
            console.log("cart error : ", actions.error);
            state.isLoading = false;
            state.error = "Error while fetching cart data"
        })

    }
})

export const { toggleCart } = cartSlice.actions
export const getCartState = (state: RootState) => state.cart
export default cartSlice.reducer;