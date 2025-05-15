import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shelfshare-v2.vercel.app/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ filters, token }) => {
        const filteredParams = Object.fromEntries(
          Object.entries(filters).filter(([, value]) => value !== "")
        );

        const params = new URLSearchParams(filteredParams);
        return {
          url: `user?${params.toString()}`,
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        };
      },
    }),
    getUserAccountDetails: builder.query({
      query: (token) => ({
        url: `user/me`,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }),
      providesTags: ["User"],
    }),
    editUserInfo: builder.mutation({
      query: ({ data, token }) => ({
        url: `user`,
        method: "PUT",
        body: data,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useGetUserAccountDetailsQuery,
  useEditUserInfoMutation,
} = usersApi;
