import { FrequencyProps } from "@/types/modelProps";
import axios, { AxiosResponse } from "axios";

export const getAllFrequency = async (): Promise<FrequencyProps[]> => {
    const { data } = await axios.get<FrequencyProps[]>('/api/frequency');
    return data
}

export const createFrequency = async (frequencyData: FrequencyProps): Promise<FrequencyProps> => {
    try {
        const response: AxiosResponse<FrequencyProps> = await axios.post(`/api/frequency`, frequencyData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occured!';
            throw new Error(errorMessage)
        } else {
            throw new Error('An unknowd error occured!!!')
        }
    }
}
export const getSpecificFrequency = async (id: number): Promise<FrequencyProps> => {
    try {
        const { data }: AxiosResponse<FrequencyProps> = await axios.get<FrequencyProps>(`/api/frequency/${id}`)
        return data
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || 'An unexpected error occurred!';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occsurred!');
        }
    }
}