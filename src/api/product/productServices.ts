import api from "../config"
import type { Product, ProductDetails } from "../models/ProductModel";

interface ProductsResponse {
    success: boolean;
    products: Product[];
}

interface HomeProductResponse {
    success: boolean;
    products: Product[];
    accessories: Product[];
}

interface RecommendedProductResponse {
    success: boolean;
    products: Product[];
}

interface SearchedProductResponse {
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

export const getHomeProducts = async (): Promise<HomeProductResponse> => {
    const response = await api.get<HomeProductResponse>("/product/home-products");
    return response.data
}

export const getRecommendedProducts = async ({ productId, category }: { productId: string, category: string }): Promise<RecommendedProductResponse> => {
    const response = await api.get<RecommendedProductResponse>(`/product/recommended?productId=${productId}&category=${category}`);
    return response.data
}

export const getSearchedProducts = async ({ query }: { query: string }): Promise<SearchedProductResponse> => {
    const response = await api.get<SearchedProductResponse>(`/product/search?q=${query}`);
    return response.data
}
