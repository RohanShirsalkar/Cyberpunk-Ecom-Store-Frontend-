import api from "../config"
import type { LoginUserRequest, LoginUserResponse, SignupUserRequest, SignupUserResponse } from "../models/authModel"

export const userLogin = async (data: LoginUserRequest): Promise<LoginUserResponse> => {
    const response = await api.post<LoginUserResponse>("/auth/login", data)
    return response.data
}

export const userSignup = async (data: SignupUserRequest): Promise<SignupUserResponse> => {
    const response = await api.post<SignupUserResponse>("/auth/signup", data)
    return response.data
}

export const userLogout = async (): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>("/auth/logout")
    return response.data
}