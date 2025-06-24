import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";
import type { RootState } from "../store";

const initialState: AuthState = {
    isAuthDialogOpen: false,
    userId: localStorage.getItem("userId") || "",
    isLoggedIn: localStorage.getItem("userId") ? true : false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        toggleAuthDialog: (state) => {
            state.isAuthDialogOpen = !state.isAuthDialogOpen
        },
        setUser: (state, { payload }: PayloadAction<{ id: string }>) => {
            state.isLoggedIn = true
            state.userId = payload.id
            localStorage.setItem("userId", payload.id)
        },
        removeUser: (state) => {
            state.isLoggedIn = false
            state.userId = ""
            localStorage.removeItem("userId")
        }
    }
});

export const { toggleAuthDialog, setUser, removeUser } = authSlice.actions;
export const getAuthState = (state: RootState) => state.auth
export default authSlice.reducer;