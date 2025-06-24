export interface Product {
    _id: string;
    name: string;
    price: string;
    img: string;
    category: string;
    rating: number;
    productId: string;
    inStockValue: number;
    soldStockValue: number;
    visibility: "on" | "off";
}