var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import axios from "axios";
var API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    throw new Error('VITE_API_URL environment variable is not defined');
}
export var authApi = axios.create({
    baseURL: API_URL,
});
authApi.interceptors.request.use(function (config) {
    var token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = "Bearer ".concat(token);
    }
    return config;
}, function (error) { return Promise.reject(error); });
export var login = function (identifier, password) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, authApi.post("/auth/login", {
                        identifier: identifier,
                        password: password,
                    })];
            case 1:
                res = _c.sent();
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    return [2 /*return*/, res.data];
                }
                return [2 /*return*/, null];
            case 2:
                error_1 = _c.sent();
                if (axios.isAxiosError(error_1) && ((_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message)) {
                    throw new Error(error_1.response.data.message);
                }
                throw new Error("Invalid credentials");
            case 3: return [2 /*return*/];
        }
    });
}); };
export var registerService = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_2, errorMessage, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, authApi.post("/auth/signup", userData)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, {
                        success: res.status === 201,
                        data: res.data.data,
                        message: res.data.message,
                        status: res.status
                    }];
            case 2:
                error_2 = _a.sent();
                if (axios.isAxiosError(error_2) && error_2.response) {
                    errorMessage = error_2.response.data.message || "Registration failed";
                    throw {
                        success: false,
                        message: errorMessage,
                        status: error_2.response.status
                    };
                }
                err = error_2;
                throw {
                    success: false,
                    message: err.message || "Registration failed",
                    status: 500
                };
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getCurrentUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    var token, base64Url, base64, payload;
    return __generator(this, function (_a) {
        try {
            token = localStorage.getItem("token");
            if (!token)
                return [2 /*return*/, null];
            base64Url = token.split(".")[1];
            base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            payload = JSON.parse(window.atob(base64));
            if (payload.id) {
                return [2 /*return*/, {
                        id: payload.id,
                        identifier: payload.identifier,
                        role: payload.role || "user",
                    }];
            }
            return [2 /*return*/, null];
        }
        catch (error) {
            console.error("Failed to get current user:", error);
            return [2 /*return*/, null];
        }
        return [2 /*return*/];
    });
}); };
