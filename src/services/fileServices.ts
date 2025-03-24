import { FilesProps } from "@/types/modelProps";
import axios, { AxiosResponse } from "axios";

export const getFilesByEntityID = async (id: number): Promise<FilesProps> => {
    const { data } = await axios.get<FilesProps>(`/api/files/${id}`)
    return data
}