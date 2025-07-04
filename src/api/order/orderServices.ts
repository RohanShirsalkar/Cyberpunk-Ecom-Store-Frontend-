import api from "../config"
import type { CreateOrder, Order } from "../models/orderModel"

interface CreateOrderResponse {
    success: boolean,
    message: string,
    order: Order,
}

export const createOrder = async (data: CreateOrder): Promise<CreateOrderResponse> => {
    const response = await api.post<CreateOrderResponse>("/order/place-order", data)
    return response.data
}