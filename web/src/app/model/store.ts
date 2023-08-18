import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postReducer } from '../../entities/post/model/post';
import { authReducer } from '../../entities/auth/model/auth';

const rootReducer = combineReducers({
  authReducer,
  postReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
