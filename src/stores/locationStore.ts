import { getAllLocations, getSpecificLocation } from "@/services/locationServices";
import { LocationProps } from "@/types/modelProps";
import { create } from "zustand";

interface LocationState {
    locations: LocationProps[];
    specificLocation: LocationProps | null;
    setLocation: (locations: LocationProps[]) => void;
    addLocation: (location: LocationProps) => void;
    deleteLocation: (id: number) => void;
    updateLocation: (id: number, location: LocationProps) => void;
    fetchLocations: () => void;
    fetchSpecificLocation: (id: number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    locations: [],
    specificLocation: null,
    setLocation: (locations: LocationProps[]) => set({ locations }),
    addLocation: (location: LocationProps) => set((state) => ({ locations: [...state.locations, location] })),
    deleteLocation: (id: number) => set((state) => ({ locations: state.locations.filter((location) => location.id !== id) })),
    updateLocation: (id: number, location: LocationProps) => set((state) => ({ locations: state.locations.map((l) => (l.id === id ? location : l)) })),
    fetchLocations: async () => {
        try {
            const locationData = await getAllLocations();
            set({ locations: locationData });
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    },
    fetchSpecificLocation: async (id: number) => {
        console.log(id)
        try {
            const locationData = await getSpecificLocation(id);
            set ({specificLocation: locationData})
        } catch (error) {
            console.error('Error fetching location Inventories', error)
        }
    }
}));

