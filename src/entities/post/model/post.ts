import { createSlice } from '@reduxjs/toolkit';

interface postsState {
  loading: boolean;
  error: string;
  filter: string;
}

const initialState: postsState = {
  loading: false,
  error: '',
  filter: '1',
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
