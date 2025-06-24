import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { AppState, ToastInterface } from "../models/appModel";

interface ToastPayload {
    title: string;
    message: string;
}

const initialState: AppState = {
    toasts: []
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        showSuccessToast: (state, { payload }: PayloadAction<ToastPayload>) => {
            addToast(
                state.toasts,
                "success",
                payload.title,
                payload.message
            );
        },
        showErrorToast: (state, { payload }: PayloadAction<ToastPayload>) => {
            addToast(
                state.toasts,
                "error",
                payload.title,
                payload.message
            );
        },
        showInfoToast: (state, { payload }: PayloadAction<ToastPayload>) => {
            addToast(
                state.toasts,
                "info",
                payload.title,
                payload.message
            );
        },
        removeToast: (state, { payload }: PayloadAction<number>) => {
            state.toasts = state.toasts.filter((toast) => toast.id !== payload)
        }
    }
});

const addToast = (toasts: ToastInterface[], type: string, title: string, message: string) => {
    const id = Date.now() + Math.random();
    const newToast = { id, type, title, message };
    toasts.push(newToast)
};


export const { showErrorToast, showInfoToast, showSuccessToast, removeToast } = appSlice.actions;
export const getAppState = (state: RootState) => state.app
export default appSlice.reducer;


// { payload }: PayloadAction<ToastInterface>
// { payload }: PayloadAction<ToastInterface>
// { payload }: PayloadAction<ToastInterface>