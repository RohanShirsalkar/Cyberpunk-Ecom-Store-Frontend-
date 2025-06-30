export interface CartItem {
    _id: string;
    name: string;
    price: string;
    mrp: string;
    img: string;
    category: string;
    rating: number;
    inStockValue: number;
    visibility: "on" | "off";
    productQty: number;
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

export interface UpdateCartProductQtyRequest {
    userId: string,
    productId: string,
    productQty: number
}

export interface UpdateCartProductQtyResponse {
    message: string,
}

export interface RemoveCartProductRequest {
    userId: string,
    productId: string
}

export interface RemoveCartProductResponse {
    message: string,
}