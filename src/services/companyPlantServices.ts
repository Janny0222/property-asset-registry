import { CompanyPlantProps } from "@/types/modelProps";
import axios, { AxiosResponse } from "axios";

export const getAllCompanyPlant = async (): Promise<CompanyPlantProps[]> => {
    const { data } = await axios.get<CompanyPlantProps[]>('/api/company-plant');
    return data
}
export const createCompanyPlant = async (governmentPermitData: CompanyPlantProps): Promise<CompanyPlantProps> => {
    try {
        const response: AxiosResponse<CompanyPlantProps> = await axios.post(`/api/company-plant`, governmentPermitData);
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
export const getSpecificCompanyPlant = async (id: number): Promise<CompanyPlantProps> => {
    
    try {
        const { data }: AxiosResponse<CompanyPlantProps> = await axios.get<CompanyPlantProps>(`/api/company-plant/${id}`)
        
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