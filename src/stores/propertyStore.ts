import { create } from "zustand";
import { PropertyProps } from "@/types/modelProps";
import { getAllProperty, getSpecificProperty } from "@/services/propertyServices";

interface PropertyState {
    property: PropertyProps[];
    specificProperty: PropertyProps | null;
    fetchAllProperty: () => void;
    fetchSpecificProperty: (id: number) => void
}

export const usePropertyStore = create<PropertyState>((set) => ({
    property: [],
    specificProperty: null,
    fetchAllProperty: async () => {
        try {
            const propertyData = await getAllProperty();
            set({ property: propertyData})
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    },
    fetchSpecificProperty: async(id: any) => {
        try {
            const propertyData = await getSpecificProperty(id);
            set({ specificProperty: propertyData || null })
        } catch (error) {
            console.error('Error fetching property', error)
        }
    },
}))