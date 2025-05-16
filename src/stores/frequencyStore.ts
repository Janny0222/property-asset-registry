import { getAllFrequency, getSpecificFrequency } from "@/services/frequencyService";
import { FrequencyProps } from "@/types/modelProps";
import { create } from "zustand";

interface FrequencyState {
    frequency: FrequencyProps[];
    specificFrequency: FrequencyProps | null;
    fetchSpecificFrequency: (id: number) => Promise<FrequencyProps>;
    fetchAllFrequency: () => Promise<FrequencyProps[]>;
}

export const useFrequencyStore = create<FrequencyState>((set) => ({
    frequency: [],
    specificFrequency: null,
    fetchAllFrequency: async () => {
        try {
            const frequencyData = await getAllFrequency();
            set({ frequency: frequencyData });
            return frequencyData;
        } catch (error) {
            console.error("Error fetching frequency:", error);
            throw error; // Rethrow the error for further handling if needed
        }
    },
    fetchSpecificFrequency: async (id: number) => {
        try {
            const frequencyData = await getSpecificFrequency(id);
            set({ specificFrequency: frequencyData });
            return frequencyData;
        } catch (error) {
            console.error("Error fetching specific frequency:", error);
            throw error; // Rethrow the error for further handling if needed
        }
    }
}));