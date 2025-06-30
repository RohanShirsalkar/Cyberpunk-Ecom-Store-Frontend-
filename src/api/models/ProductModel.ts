export interface Product {
    _id: string;
    name: string;
    price: string;
    mrp: string;
    img: string;
    category: string;
    rating: number;
    visibility: "on" | "off";
}

export interface ProductDetails {
    _id: string;
    name: string;
    price: string;
    mrp: string;
    img: string;
    images: string[];
    category: string;
    rating: number;
    description: string;
    features: string;
    productId: string;
    inStockValue: number;
    soldStockValue: number;
    visibility: "on" | "off";
}


// export interface Productt {
//     _id: string;
//     name: string;
//     price: string;
//     img: string;
//     category: string;
//     rating: number;
//     productId: string;
//     inStockValue: number;
//     soldStockValue: number;
//     visibility: "on" | "off";
// }