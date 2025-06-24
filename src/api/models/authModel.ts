export interface LoginUserRequest {
    email: string
    password: string
}

export interface LoginUserResponse {
    message: string
    userId: string
}

export interface SignupUserRequest {
    name: string
    email: string
    password: string
    phone: string
}

export interface SignupUserResponse {
    message: string
    userId: string
}
