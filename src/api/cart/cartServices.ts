import api from "../config"
import type { UserCart } from "../models/cartModel"

interface AddToCartRequest {
    userId: string,
    productId: string,
    quantity: number
}

export const getCartByUserId = async (data: { userId: string }): Promise<UserCart> => {
    const response = await api.post<UserCart>("/cart/get-cart", data)
    return response.data
}

export const addToCart = async (data: AddToCartRequest): Promise<UserCart> => {
    const response = await api.post<UserCart>("/cart/addtocart", data)
    return response.data
}