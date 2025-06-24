import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import appReducer from "./app/appSlice";
import cartReducer from "./cart/cartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        cart: cartReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch