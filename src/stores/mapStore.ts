import { create } from "zustand";

interface MapState  {
    mapLocation: string,
    setMapLocation: (mapLocation: string) => void
}

export const useMapStore = create<MapState>((set) => ({
    mapLocation: '',
    setMapLocation: (mapLocation: string) => set({mapLocation})
}))