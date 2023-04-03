// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../axios';
// import { ILogin } from '../types/auth';
// import { useAppDispatch } from '../hooks';
// import { AppDispatch } from './store';
// import { authReducer } from './slices/auth';


// export function AuthPage() {
//     const dispatch = useAppDispatch();
// }

// export const fetchLogin = createAsyncThunk('auth/login', async (params: ILogin) => {
//     return async (dispatch: AppDispatch) => {
//         try {
//             const { data } = await axios.post('/auth/login', params);
//             dispatch(authReducer.actions.login(data))
//             return data;
//         } catch (e) {
//             console.log('Error Login', e);
//         }
//     };
// });
