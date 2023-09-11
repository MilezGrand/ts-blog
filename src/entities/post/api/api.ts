import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost, IAddingPost } from '../model/types';

export const postApi = createApi({
  tagTypes: ['Posts'],
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://82.146.54.93:8080/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', window.localStorage.getItem('token') || '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPost: builder.query<IPost, string>({
      query: (id) => `posts/${id}`,
      providesTags: ['Posts'],
    }),
    getAllPosts: builder.query({
      query: (popular) => `/posts?popular=${popular}`,
      providesTags: ['Posts'],
    }),
    addPost: builder.mutation<IPost, IAddingPost>({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: builder.mutation({
      query: ({ id, fields }) => ({ url: `posts/${id}`, method: 'PATCH', body: fields }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation<number, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetAllPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postApi;
