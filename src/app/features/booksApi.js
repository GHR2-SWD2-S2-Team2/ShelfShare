import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shelfshare-v2.vercel.app/api",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ filters, token }) => {
        const filteredParams = Object.fromEntries(
          Object.entries(filters).filter(([, value]) => value !== "")
        );

        const params = new URLSearchParams(filteredParams);
        return {
          url: `book?${params.toString()}`,
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        };
      },
    }),

    editBook: builder.mutation({
      query: ({ id, data, token }) => ({
        url: `book/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }),
    }),

    deleteBook: builder.mutation({
      query: ({ id, token }) => ({
        url: `book/${id}`,
        method: "DELETE",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }),
    }),

    addBook: builder.mutation({
      query: ({ formData, token }) => ({
        url: `book`,
        method: "POST",
        body: formData,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }),
    }),

    reviewBook: builder.mutation({
      query: ({ bookId, rate, token }) => ({
        url: `book/review/${bookId}`,
        method: "POST",
        body: { rate },
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useEditBookMutation,
  useDeleteBookMutation,
  useAddBookMutation,
  useReviewBookMutation,
} = booksApi;
