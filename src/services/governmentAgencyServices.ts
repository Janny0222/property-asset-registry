import { GovernmentPermitProps } from "@/types/modelProps";
import axios, { AxiosResponse } from "axios";

export const getAllGovernmentAgency = async (): Promise<GovernmentPermitProps[]> => {
    const { data } = await axios.get<GovernmentPermitProps[]>('/api/government-agency');
    return data
}
export const createGovernmentAgency = async (governmentPermitData: GovernmentPermitProps): Promise<GovernmentPermitProps> => {
    try {
        const response: AxiosResponse<GovernmentPermitProps> = await axios.post(`/api/government-agency`, governmentPermitData);
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
export const getSpecificGovernmentAgency = async (id: number): Promise<GovernmentPermitProps> => {
    
    try {
        const { data }: AxiosResponse<GovernmentPermitProps> = await axios.get<GovernmentPermitProps>(`/api/government-agency/${id}`)
        
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