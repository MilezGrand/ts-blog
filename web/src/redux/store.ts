import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";


const rootReducer = combineReducers({
    authReducer,
    postReducer,
  })

  export function setupStore() {
    return configureStore({
      reducer: rootReducer
    })
  }

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
