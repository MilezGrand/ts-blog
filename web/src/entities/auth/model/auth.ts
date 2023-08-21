import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../shared/lib/axios';
import { IUser } from './types';
import { RootState } from '../../../app/model/store';
import { AxiosError } from 'axios';
import { fetchLogin } from 'pages/login/model/login';
import { fetchRegister, uploadAvatar } from 'pages/registration/model/registration';

export const fetchAuthMe = createAsyncThunk('auth/me', async function (_, { rejectWithValue }) {
  try {
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (error) {
    const { response } = error as AxiosError<{ message: string }>;
    return rejectWithValue(response?.data.message);
  }
});

interface AuthState {
  loading: boolean;
  error: string | undefined | unknown;
  user: IUser | null;
  uploadedAvatar: string;
}

const initialState: AuthState = {
  error: '',
  loading: false,
  user: null,
  uploadedAvatar: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      window.localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedAvatar = action.payload;
      });
  },
});

export const selectIsAuth = (state: RootState) => {
  Boolean(state.authReducer.user);
};

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
