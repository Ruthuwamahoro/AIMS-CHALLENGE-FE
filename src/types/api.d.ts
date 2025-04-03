export interface ApiError {
    status: number;
    message: string;
}
export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}
export interface LoginResponse {
    token: string;
    user: {
        id: string;
        fullName: string;
        username: string;
        email: string;
        role: string;
    };
}
export interface UserResponse {
    id: string;
    fullName: string;
    username: string;
    email: string;
    role: string;
    telephone?: string;
    gender?: string;
}
export interface RegisterResponse {
    message: string;
    user: UserResponse;
}
