import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost, IAddingPost } from '../model/types';

export const postApi = createApi({
  tagTypes: ['Posts'],
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://milezgrand.site/api',
    prepareHeaders: (headers) => {
      headers.set('Authorization', window.localStorage.getItem('token') || '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPost: builder.query<IPost, string>({
      query: (id: string): string  => {
        if (id) {
          return `posts/${id}`;
        }
        return 'auth/me';
      },
      providesTags: ['Posts'],
    }),
    getAllPosts: builder.query({
      query: (filter) => `/posts?filter=${filter}`,
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
