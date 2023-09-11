import { createSlice } from '@reduxjs/toolkit';

interface postsState {
  loading: boolean;
  error: string;
  filter: boolean;
}

const initialState: postsState = {
  loading: false,
  error: '',
  filter: true,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { toggleFilter } = postSlice.actions;
export const postReducer = postSlice.reducer;
