import api from "../config";

export interface Coupon {
    _id: string;
    code: string;
    discountPercentage: number;
    status: "active" | "inactive";
}

export interface VerifyCouponResponse {
    success: boolean;
    message: string;
    isValid: boolean;
    coupon: Coupon;
}


export const verifyCoupon = async (data: { code: string }): Promise<VerifyCouponResponse> => {
    const response = await api.post<VerifyCouponResponse>("/coupon/verify-coupon", data)
    return response.data
}   