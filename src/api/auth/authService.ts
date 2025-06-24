import api from "../config"

interface LoginUserRequest {
    email: string
    password: string
}

interface LoginUserResponse {
    message: string
    userId: string
}

interface SignupUserRequest {
    name: string
    email: string
    password: string
    phone: string
}

interface SignupUserResponse {
    message: string
    userId: string
}

export const userLogin = async (data: LoginUserRequest): Promise<LoginUserResponse> => {
    const response = await api.post<LoginUserResponse>("/auth/login", data)
    return response.data
}

export const userSignup = async (data: SignupUserRequest): Promise<SignupUserResponse> => {
    const response = await api.post<SignupUserResponse>("/auth/signup", data)
    return response.data
}