import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://jsonplaceholder.typicode.com/";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], void>({
      query: () => `posts`,
    }),

    getPost: builder.query<Post, number>({
      query: (id: number) => `posts/${id}`,
    }),
  }),
});

export const { useGetAllPostsQuery, useGetPostQuery } = postsApi;
