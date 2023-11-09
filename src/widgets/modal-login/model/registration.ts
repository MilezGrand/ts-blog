import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from 'shared/lib/axios';

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
  avatarUrl: string;
}

export const fetchRegister = createAsyncThunk('auth/register', async function (params: IRegister, { rejectWithValue }) {
  try {
    const { data } = await axios.post('/auth/register', params);
    return data;
  } catch (error) {
    const { response } = error as AxiosError<{ message: string }>;
    return rejectWithValue(response?.data.message);
  }
});

export const uploadAvatar = createAsyncThunk('auth/upload', async function (params: FormData, { rejectWithValue }) {
  try {
    const { data } = await axios.post('/upload', params);
    return data.url;
  } catch (error) {
    const { response } = error as AxiosError<{ message: string }>;
    return rejectWithValue(response?.data.message);
  }
});
