import api from "../config"
import type { Product } from "../models/ProductModel";

interface ProductsResponse {
    success: boolean;
    products: Product[];
}

export const getAllProducts = async (): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>("/get-product")
    return response.data
}