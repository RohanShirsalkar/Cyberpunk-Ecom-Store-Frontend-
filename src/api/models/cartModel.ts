export interface CartItem {
    _id: string;
    name: string;
    price: string;
    img: string;
    category: string;
    rating: number;
    inStockValue: number;
    visibility: "on" | "off";
}

export interface UserCart {
    success: boolean;
    cartTotal: string;
    cartItems: CartItem[];
}


export interface AddToCartRequest {
    userId: string,
    productId: string,
    quantity: number
}

export interface AddToCartResponse {
    success: boolean,
    message: string,
    cart: UserCart
}