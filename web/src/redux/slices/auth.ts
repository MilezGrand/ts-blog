import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { ILogin, IRegister, IUser } from '../../interfaces/auth';
import { RootState } from '../store';
import { AxiosError } from 'axios';

export const fetchRegister = createAsyncThunk(
    'auth/register',
    async function (params: IRegister, { rejectWithValue }) {
        try {
            const response = await axios.post('/auth/register', params);
            return response.data;
        } catch (error) {
            const { message } = error as AxiosError;
            return rejectWithValue(message);
        }
    },
);

export const fetchLogout = createAsyncThunk('auth/me', async function (_, { rejectWithValue }) {
    try {
        const response = await axios.get('/auth/logout');
        return response.data;
    } catch (error) {
        const { message } = error as AxiosError;
        return rejectWithValue(message);
    }
});

export const fetchAuthMe = createAsyncThunk('auth/me', async function (_, { rejectWithValue }) {
    try {
        const response = await axios.get('/auth/me');
        return response.data;
    } catch (error) {
        const { response } = error as AxiosError<{ message: string }>;
        return rejectWithValue(response?.data.message);
    }
});

export const fetchLogin = createAsyncThunk(
    'auth/login',
    async function (params: ILogin, { rejectWithValue }) {
        try {
            const response = await axios.post('/auth/login', params);
            return response.data;
        } catch (error) {
            const { message } = error as AxiosError;
            return rejectWithValue(message);
        }
    },
);

interface AuthState {
    loading: boolean;
    error: string;
    user: IUser | null;
}

const initialState: AuthState = {
    error: '',
    loading: false,
    user: null,
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
            });
    },
});

export const selectIsAuth = (state: RootState) => {
    Boolean(state.authReducer.user);
};

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
