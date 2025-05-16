import { getAllPermitHistoryByPermitId } from "@/services/permitHistoryServices";
import { PermitHistoryProps } from "@/types/modelProps";
import { create } from "zustand";

interface PermitHistoryStore {
    permitHistory: PermitHistoryProps[];
    fetchPermitHistoryById: (id: number) => Promise<void>;
}

export const usePermitHistoryStore = create<PermitHistoryStore>((set) => ({
    permitHistory: [],
    fetchPermitHistoryById: async (id: number) => {
        try {
            const permitHistoryData = await getAllPermitHistoryByPermitId(id);
            set({ permitHistory: permitHistoryData });
        } catch (error) {
            console.error("Error fetching permit history:", error);
        }
    },
}));