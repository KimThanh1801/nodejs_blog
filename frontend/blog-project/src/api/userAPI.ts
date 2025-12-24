// userAPI.ts
export interface LoginFormValues {
    email: string;
    password: string;
}

export interface RegisterFormValues {
    fullName: string;
    email: string;
    password: string;
}

const BASE_URL = "http://localhost:5000/users";

export async function registerUser(data: RegisterFormValues) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Đăng ký thất bại");
    return resData;
}

export async function loginUser(data: LoginFormValues) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Đăng nhập thất bại");
    return resData; // { user, token }
}