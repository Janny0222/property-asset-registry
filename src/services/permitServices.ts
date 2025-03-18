import { PermitProps } from "@/types/modelProps";
import axios, { AxiosResponse } from "axios";

export const getAllPermits = async (): Promise<PermitProps[]> => {
    const { data } = await axios.get<PermitProps[]>(`/api/permit`);
    return data
}

export const getAllByGovernmentAgency = async (government_agency: number): Promise<PermitProps[]> => {
    const { data } = await axios.get<PermitProps[]>(`/api/permit/${government_agency}`);
    return data
}

export const createPermit = async (permitData: PermitProps): Promise<PermitProps> => {
    try {
        const { data }: AxiosResponse<PermitProps> = await axios.post(`/api/permit`, permitData)
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

export const getPermitByID = async (permit_id: number): Promise<PermitProps> => {
    const { data } = await axios.get<PermitProps>(`/api/permit/edit/${permit_id}`);
    return data
}

export const updatePermitByID = async (permit_id: number, permitData: PermitProps): Promise<PermitProps> => {
    try {
        const { data }: AxiosResponse<PermitProps> = await axios.put(`/api/permit/edit/${permit_id}`, permitData);
        return data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || 'An Expected error occured!';
            throw new Error(errorMessage)
        } else {
            throw new Error('An unknown error occured!!')
        }
    }
}

export const getAllPermitForRenewal = async (): Promise<PermitProps[]> => {
    const { data } = await axios.get<PermitProps[]>(`/api/permit/renewal`)
    return data
}