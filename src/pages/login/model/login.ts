import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from 'shared/lib/axios';

export interface ILogin {
  email: string;
  password: string;
}

export const fetchLogin = createAsyncThunk('auth/login', async function (params: ILogin, { rejectWithValue }) {
  try {
    const { data } = await axios.post('/auth/login', params);
    return data;
  } catch (error) {
    const { response } = error as AxiosError<{ message: string }>;
    return rejectWithValue(response?.data.message);
  }
});
