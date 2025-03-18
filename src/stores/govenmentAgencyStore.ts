import { getAllGovernmentAgency, getSpecificGovernmentAgency } from "@/services/governmentAgencyServices";
import { GovernmentPermitProps } from "@/types/modelProps";
import { create } from "zustand";

interface GovernmentPermitState {
    governmentAgency: GovernmentPermitProps[];
    specificGovernmentAgency: GovernmentPermitProps | null;
    fetchAllGovernmentAgency: () => void;
    fetchSpecificGovernmentAgency: (id: number) => void
}

export const useGovernmentPermitStore = create<GovernmentPermitState>((set) => ({
    governmentAgency: [],
    specificGovernmentAgency: null,
    fetchAllGovernmentAgency: async () => {
        try {
            const agencyData = await getAllGovernmentAgency();
            set({ governmentAgency: agencyData})
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    },
    fetchSpecificGovernmentAgency: async(id: any) => {
        try {
            const agencyData = await getSpecificGovernmentAgency(id);
            set({ specificGovernmentAgency: agencyData || null })
        } catch (error) {
            console.error('Error fetching property', error)
        }
    },
}));

