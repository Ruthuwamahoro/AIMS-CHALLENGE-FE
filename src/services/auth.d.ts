import { User } from "../types/auth";
export declare const authApi: import("axios").AxiosInstance;
export declare const login: (identifier: string, password: string) => Promise<any>;
export declare const registerService: (userData: User) => Promise<{
    success: boolean;
    data: any;
    message: any;
    status: number;
}>;
export declare const getCurrentUser: () => Promise<{
    id: any;
    identifier: any;
    role: any;
}>;
