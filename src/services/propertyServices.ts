import axios, { AxiosResponse } from "axios";
import { PropertyProps } from "@/types/modelProps";
import { useErrorStore } from "@/stores/errorStore";

export const createProperty = async (propertyData: PropertyProps): Promise<PropertyProps> => {
    const { setError } = useErrorStore.getState()
    try {
        const response: AxiosResponse<PropertyProps> = await axios.post(`/api/property`, propertyData);
        setError(null)
        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || 'An unexpected error occured!';
            setError(errorMessage)
            console.error(errorMessage)
            throw new Error(errorMessage)
        } else {
            throw new Error('An unknowd error occured!!!')
        }
    }
}

export const getAllProperty = async (): Promise<PropertyProps[]> => {
    try {
        const { data } = await axios.get<PropertyProps[]>(`/api/property`);
       
        return data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occured!';
            throw new Error(errorMessage)
        } else {
            throw new Error('An unknowd error occured!!!')
        }
    }
}

export const getSpecificProperty = async (propertyId: number): Promise<PropertyProps> => {
    try {
        const { data } = await axios.get<PropertyProps>(`/api/property/${propertyId}`)
        return data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occured!';
            throw new Error(errorMessage)
        } else {
            throw new Error('An unknowd error occured!!!')
        }
    }
}