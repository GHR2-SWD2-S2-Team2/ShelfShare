import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const buildQueryParams = (params) =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shelfshare-v2.vercel.app/api",
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ filters, token }) => {
        const queryParams = buildQueryParams(filters);
        return {
          url: queryParams ? `/order?${queryParams}` : "/order",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        };
      },
    }),
    getOrder: builder.query({
      query: ({ orderId, token }) => ({
        url: `/order/${orderId}`,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderQuery } = ordersApi;
