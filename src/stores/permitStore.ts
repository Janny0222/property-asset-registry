import { getAllByGovernmentAgency, getAllPermitForRenewal, getAllPermits, getPermitByID  } from "@/services/permitServices";
import { PermitProps } from "@/types/modelProps";
import { create } from "zustand";

interface PermitStore {
    permit: PermitProps[];
    specificPermit: PermitProps | null;
    permitForRenewal: PermitProps[];
    fetchAllPermit: () => void;
    fetchAllPermitByGovernmentAgency: (government_agency: string) => Promise<void>;
    fetchPermitByID: (id: number) => Promise<void>
    fetchAllPermitForRenewal: () => void
}

export const usePermitStore = create<PermitStore>((set) => ({
    permit: [],
    specificPermit: null,
    permitForRenewal: [],
    fetchAllPermit: async () => {
        try {
            const permitData = await getAllPermits();
            set({ permit: permitData})
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    },
    fetchAllPermitByGovernmentAgency: async (government_agency: string) => {
        try {
            const permitData = await getAllByGovernmentAgency(government_agency);
            set({ permit: permitData})
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    },
    fetchPermitByID: async (id: number) => {
        try {
            const permitData = await getPermitByID(id);
            console.log(permitData)
            set({ specificPermit: permitData })
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    },
    fetchAllPermitForRenewal: async () => {
        try {
            const permitData = await getAllPermitForRenewal()
            set({ permitForRenewal: permitData})
        } catch (error) {
            console.error("Error fetching permit for renewal", error)
        }
    }
}));

