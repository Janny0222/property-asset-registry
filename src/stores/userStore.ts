import { LoggedUser } from "@/types/propTypes";
import {create} from "zustand";

interface UserState {
    id: number | null
    username: string | null
    fullName: string | null
    setUser: (user: LoggedUser) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    id: null,
    username: null,
    fullName: null,
    setUser: (user: LoggedUser | null) => set({
        id: user?.id,
        username: user?.username,
        fullName: user?.fullName
    }),
    clearUser: () => set({ id: null, username: null, fullName: null }),
}))