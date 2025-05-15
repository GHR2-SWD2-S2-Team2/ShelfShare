import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "./features/booksApi";
import booksFilterReducer from "./features/FiltersSlice";
import { ordersApi } from "./features/ordersApi";
import { usersApi } from "./features/usersApi";

export const store = configureStore({
  reducer: {
    booksFilters: booksFilterReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      booksApi.middleware,
      usersApi.middleware,
      ordersApi.middleware
    ),
});
