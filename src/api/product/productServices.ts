import api from "../config"
import type { Product, ProductDetails } from "../models/ProductModel";

interface ProductsResponse {
    success: boolean;
    products: Product[];
}

export const getAllProducts = async (): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>("/get-product")
    return response.data
}

export const getProductById = async (id: string): Promise<ProductDetails> => {
    const response = await api.get<{ success: boolean; product: ProductDetails }>(`/product/${id}`);
    return response.data.product;
}