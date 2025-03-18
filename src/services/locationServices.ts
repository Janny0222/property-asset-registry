import { LocationProps } from "@/types/modelProps";
import axios, { AxiosResponse } from "axios";

export const getAllLocations = async (): Promise<LocationProps[]> => {
    const { data } = await axios.get<LocationProps[]>('/api/locations');
    return data
}
export const createLocation = async (locationData: LocationProps): Promise<AxiosResponse<LocationProps>> => await axios.post('/api/locations', locationData);

export const getSpecificLocation = async (id: number): Promise<LocationProps> => {
    
    try {
        const { data }: AxiosResponse<LocationProps> = await axios.get<LocationProps>(`/api/locations/${id}`)
        
        return data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || 'An unexpected error occurred!';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occsurred!');
        }
    }
}