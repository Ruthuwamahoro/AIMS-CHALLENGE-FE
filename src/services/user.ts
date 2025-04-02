import { userData } from '../types/auth';
import { authApi } from './auth';


export const getAllUsers = async (): Promise<userData[]> => {
  try {
    const response = await authApi.get('/users');
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};