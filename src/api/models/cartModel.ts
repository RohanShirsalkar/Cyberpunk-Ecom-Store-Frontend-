export interface CartItem {
    productId: string;
    productQty: number;
}

export interface UserCart {
    userId: string;
    productsInCart: CartItem[];
}


