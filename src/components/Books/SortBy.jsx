import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../app/features/FiltersSlice";

const SortBy = () => {
  const { sort } = useSelector((state) => state.booksFilters.filters);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter({ sort: event.target.value, page: 1 }));
  };

  return (
    <FormControl
      sx={{
        width: "100%",
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
        },
      }}
      size="small"
    >
      <InputLabel id="sort-by-label">Sort By</InputLabel>
      <Select
        labelId="sort-by-label"
        id="sort-by"
        value={sort}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem value="price">Price: Low to High</MenuItem>
        <MenuItem value="-price">Price: High to Low</MenuItem>
        <MenuItem value="title">Title: A → Z</MenuItem>
        <MenuItem value="-title">Title: Z → A</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortBy;
