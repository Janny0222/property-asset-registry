
import { PermitHistoryProps } from "@/types/modelProps";
import axios, { AxiosResponse } from "axios";

export const createPermitHistory = async (permitHistoryData: PermitHistoryProps): Promise<PermitHistoryProps> => {
    try {
        const { data }: AxiosResponse<PermitHistoryProps> = await axios.post(`/api/permit-history`, permitHistoryData)
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
export const getAllPermitHistoryByPermitId = async (id: number): Promise<PermitHistoryProps[]> => {
    const { data } = await axios.get<PermitHistoryProps[]>(`/api/permit-history?permit_id=${id}`);
    return data
}