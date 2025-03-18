import axios, { AxiosResponse } from "axios";
import { UserProps } from '@/types/modelProps';

export const getAllUsers = async (): Promise<AxiosResponse<UserProps[]>> => await axios.get('/api/users');

export const createUser = async (userData: UserProps): Promise<AxiosResponse<UserProps>> => await axios.post('/api/users', userData);

