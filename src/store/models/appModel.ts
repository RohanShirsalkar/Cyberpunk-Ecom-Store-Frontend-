export interface ToastInterface {
    id: number;
    type: string;
    title: string;
    message: string;
}

// Initial App State
export interface AppState {
    toasts: ToastInterface[]
}
