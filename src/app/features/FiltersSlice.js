import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    page: 1,
    limit: 15,
    sort: "title",
  },
  totalPages: 1,
};

const booksFilterSlice = createSlice({
  name: "booksFilters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      Object.assign(state.filters, action.payload);
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setFilter, setTotalPages } = booksFilterSlice.actions;
export default booksFilterSlice.reducer;
