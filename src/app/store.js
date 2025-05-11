import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "./features/booksApi";
import booksFilterReducer from "./features/FiltersSlice";

export const store = configureStore({
  reducer: {
    booksFilters: booksFilterReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});
