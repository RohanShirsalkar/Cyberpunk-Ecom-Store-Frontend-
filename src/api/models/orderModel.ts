// types/order.d.ts or types/Order.ts

export interface OrderItem {
    productId: string; // ObjectId as string
    name: string;
    quantity: number;
    price: string;
    image: string;
}

export interface ShippingInfo {
    address: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    phone: string;
}

export interface PaymentInfo {
    id?: string;
    status?: string;
}

export type PaymentMethod = "cash" | "razorpay";
export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface Order {
    _id?: string;
    user: string; // ObjectId as string

    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;

    paymentMethod: PaymentMethod;
    paymentInfo?: PaymentInfo;

    coupon?: string | null; // ObjectId or null

    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    discountPrice: number;
    totalPrice: number;

    isPaid: boolean;
    paidAt?: string; // ISO date string

    orderStatus: OrderStatus;
    deliveredAt?: string;

    createdAt: string;
    updatedAt: string;
}


export interface CreateOrder {
    userId: string;
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    paymentMethod: PaymentMethod;
    paymentInfo?: PaymentInfo;
    coupon: string | null;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    discountPrice: number;
    totalPrice: number;
} 