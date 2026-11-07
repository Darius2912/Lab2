export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface RegistroRequest {
    username: string;
    password: string;
}