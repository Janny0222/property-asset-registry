import { getFilesByEntityID } from "@/services/fileServices";
import { FilesProps } from "@/types/modelProps";
import { create } from "zustand";


interface FilesStore {
    specificFile: FilesProps | null;
    fetchFilesByID: (id: number) => Promise<void>
}

export const useFileStore = create<FilesStore>((set) => ({
    specificFile: null,
    fetchFilesByID: async (id: number) => {
        try {
            const fileData = await getFilesByEntityID(id);
            console.log(fileData)
            set({ specificFile: fileData })
        } catch (error) {
            console.error("Error fetching Files:", error);
        }
    }
}));