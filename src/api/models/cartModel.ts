export interface CartItem {
    productId: string;
    productQty: number;
}

export interface UserCart {
    userId: string;
    productsInCart: CartItem[];
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