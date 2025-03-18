import { LoggedUser } from "@/types/propTypes";
import axios from "axios";
import { AxiosResponse } from "axios";
import { useAuthStore } from "@/stores/authStore";
import { isTokenExpired } from "@/utils/tokenUtils";


// Define a function to handle the login request
export const loginService = async (username: string, password: string) => {
    try {
        const response: AxiosResponse = await axios.post("/api/auth/login", { username, password });

        // Optionally, you can store the token in localStorage/sessionStorage or cookies if needed
        // Here, we assume that the backend sends the token in the response
        const { data } = response;

        return data; // Return data from API (like token, success message, etc.)
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Invalid credentials';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred!');
        }
    }
};

export const logoutService = async () => {
   
    try {
        const response: AxiosResponse = await axios.post('/api/auth/logout', {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error)
        return {}
    }
}


export const getSpecificUser = async (): Promise<LoggedUser | null> => {
    try {
        const response: AxiosResponse = await axios.get(`/api/auth/login`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error)
        return {}
    }
}

export const refreshAuthToken = async (): Promise<string | null> => {
    const refreshToken = document.cookie.split(';').find((cookie) => cookie.startsWith('refresh_token='))?.split('=')[1];
    if (!refreshToken) {
        return null;
    }
    try {
        const response = await axios.post('/api/auth/refresh', { refreshToken }, { withCredentials: true });
        return response.data.accessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
}

export const checkAndRefreshToken = async () => {
    const { accessToken, setAccessToken } = useAuthStore.getState();

    if (accessToken && isTokenExpired(accessToken)) {
        const newAccessToke = await refreshAuthToken();
        if (newAccessToke) {
            setAccessToken(newAccessToke);
        } else {
            window.location.href = '/login';
        }
    }
}