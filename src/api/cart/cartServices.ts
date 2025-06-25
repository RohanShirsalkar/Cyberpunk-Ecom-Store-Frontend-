import api from "../config"
import type { AddToCartRequest, AddToCartResponse, RemoveCartProductRequest, RemoveCartProductResponse, UpdateCartProductQtyRequest, UpdateCartProductQtyResponse, UserCart } from "../models/cartModel"

export const getCartByUserId = async (data: { userId: string }): Promise<UserCart> => {
    const response = await api.post<UserCart>("/cart/get-cart", data)
    return response.data
}

export const addToCartById = async (data: AddToCartRequest): Promise<AddToCartResponse> => {
    const response = await api.post<AddToCartResponse>("/cart/addtocart", data)
    return response.data
}

export const updateCartProductQty = async (data: UpdateCartProductQtyRequest): Promise<UpdateCartProductQtyResponse> => {
    const response = await api.put<UpdateCartProductQtyResponse>("/cart/update-quantity", data)
    return response.data
}

export const removeProductById = async (data: RemoveCartProductRequest): Promise<RemoveCartProductResponse> => {
    const response = await api.delete<RemoveCartProductResponse>(`/cart/delete-items?userId=${data.userId}&productId=${data.productId}`)
    return response.data
}