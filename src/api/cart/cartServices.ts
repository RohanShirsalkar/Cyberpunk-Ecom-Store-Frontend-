import api from "../config"
import type { AddToCartRequest, AddToCartResponse, UserCart } from "../models/cartModel"

export const getCartByUserId = async (data: { userId: string }): Promise<UserCart> => {
    const response = await api.post<UserCart>("/cart/get-cart", data)
    return response.data
}

export const addToCart = async (data: AddToCartRequest): Promise<AddToCartResponse> => {
    const response = await api.post<AddToCartResponse>("/cart/addtocart", data)
    return response.data
}