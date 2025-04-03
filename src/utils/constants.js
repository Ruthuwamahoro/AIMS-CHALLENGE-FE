export var API_URL = process.env.VITE_API_URL || 'http://localhost:8000/api';
export var ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    ADMIN: '/admin'
};
export var USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
};
export var VALIDATION_RULES = {
    USERNAME_MIN_LENGTH: 3,
    PASSWORD_MIN_LENGTH: 8,
    PHONE_MIN_LENGTH: 10,
    PHONE_MAX_LENGTH: 15
};
