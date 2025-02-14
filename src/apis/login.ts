import apiClient from "./api";

export const login = async (data: { name: string; email: string }) => 
    apiClient<{ token: string }>('/login', {
        method: 'POST',
        body: JSON.stringify(data),
    });