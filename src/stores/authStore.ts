import {create} from "zustand";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    setAccessToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
    refreshTokens: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    refreshToken: null,
    setAccessToken: (token: string | null) => set({ accessToken: token }),
    setRefreshToken: (token: string | null) => set({ refreshToken: token }),
    refreshTokens: async () => {
        const response = await fetch('/api/auth/refresh', {
            method: 'POST'
        })
        if (response.ok) {
            const data = await response.json();
            set({accessToken: data.accessToken})
        }
    }
}))

