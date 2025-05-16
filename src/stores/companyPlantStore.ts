import { getAllCompanyPlant, getSpecificCompanyPlant } from "@/services/companyPlantServices";
import { CompanyPlantProps } from "@/types/modelProps";
import { create } from "zustand";

interface CompanyPlantState {
    companyPlant: CompanyPlantProps[];
    specificCompanyPlant: CompanyPlantProps | null;
    fetchAllCompanyPlant: () => void;
    fetchSpecificCompanyPlant: (id: number) => void
}

export const useCompanyPlantStore = create<CompanyPlantState>((set) => ({
    companyPlant: [],
    specificCompanyPlant: null,
    fetchAllCompanyPlant: async () => {
        try {
            const propertyData = await getAllCompanyPlant();
            set({ companyPlant: propertyData})
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    },
    fetchSpecificCompanyPlant: async(id: number) => {
        try {
            const propertyData = await getSpecificCompanyPlant(id);
            set({ specificCompanyPlant: propertyData || null })
        } catch (error) {
            console.error('Error fetching property', error)
        }
    },
}));

