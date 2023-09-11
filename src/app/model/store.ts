import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postReducer } from '../../entities/post/model/post';
import { authReducer } from '../../entities/auth/model/auth';
import { postApi } from 'entities/post/api/api';

const rootReducer = combineReducers({
  authReducer,
  postReducer,
  [postApi.reducerPath]: postApi.reducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
