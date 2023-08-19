import { AxiosError } from 'axios';
import axios from '../../../shared/lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from './types';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async function (popular: boolean, { rejectWithValue }) {
  try {
    const { data } = await axios.get(`/posts?popular=${popular}`);
    return data;
  } catch (error) {
    const { message } = error as AxiosError;
    return rejectWithValue(message);
  }
});

export const fetchPost = createAsyncThunk('posts/fetchPost', async function (id: number, { rejectWithValue }) {
  try {
    const { data } = await axios.get(`/posts/${id}`);
    return data;
  } catch (error) {
    const { message } = error as AxiosError;
    return rejectWithValue(message);
  }
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async function (id: number, { rejectWithValue }) {
    try {
      axios.delete(`/posts/${id}`);
      return id;
    } catch (error) {
      const { message } = error as AxiosError;
      return rejectWithValue(message);
    }
  },
);

const emptyPost: IPost = {
  id: 0,
  title: '',
  text: '',
  tags: [],
  viewsCount: 0,
  user: {},
  imageUrl: '',
  createdAt: '',
  updatedAt: '',
};

interface postsState {
  loading: boolean;
  error: string;
  posts: IPost[];
  fullPost: IPost;
}

const initialState: postsState = {
  loading: false,
  error: '',
  posts: [],
  fullPost: emptyPost,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fullPost = emptyPost;
        state.posts = [];
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPost.pending, (state) => {
        state.fullPost = emptyPost;
        state.loading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.fullPost = action.payload;
        state.loading = false;
      })
      // .addCase(fetchTags.pending, (state) => {
      //     state.tags.items = [];
      //     state.tags.status = 'loading';
      // })
      // .addCase(fetchTags.fulfilled, (state, action) => {
      //     state.tags.items = action.payload;
      //     state.tags.status = 'loaded';
      // })
      // .addCase(fetchTags.rejected, (state) => {
      //     state.tags.items = [];
      //     state.tags.status = 'error';
      // })
      .addCase(fetchRemovePost.pending, (state, action) => {
        state.posts = state.posts.filter((obj: IPost) => obj.id !== (action.meta.arg as unknown as number));
      });
  },
});

export const postReducer = postSlice.reducer;
