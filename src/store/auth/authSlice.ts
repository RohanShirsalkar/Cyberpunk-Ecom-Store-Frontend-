import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { authState } from "./authModels";
import type { RootState } from "../store";

const initialState: authState = {
    isAuthDialogOpen: false,
    userId: localStorage.getItem("userId"),
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
        }
    }
});

export const { toggleAuthDialog, setUser } = authSlice.actions;
export const getAuthState = (state: RootState) => state.auth
export default authSlice.reducer;