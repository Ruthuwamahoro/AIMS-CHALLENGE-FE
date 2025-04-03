interface FormData {
    fullName: string;
    username: string;
    email: string;
    gender: string;
    telephone: string;
    password: string;
    confirmPassword: string;
}
interface FormErrors {
    fullName: string;
    username: string;
    email: string;
    gender: string;
    telephone: string;
    password: string;
    confirmPassword: string;
}
export declare const validateRegisterForm: (formData: FormData) => {
    valid: boolean;
    errors: FormErrors;
};
export {};
