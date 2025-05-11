import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { setFilter } from "../../app/features/FiltersSlice";
import { useGetCategoriesQuery } from "../../app/features/booksApi";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Categories = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(setFilter({ subCategory: event.target.value, page: 1 }));
  };

  const { data, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );

  if (isError || !data?.subCategories?.length)
    return <Box sx={{ color: "red", mt: 2 }}>Failed to load categories.</Box>;

  return (
    <FormControl
      sx={{
        flexGrow: 1,
        width: "100%",
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
        },
      }}
      size="small"
    >
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        id="category"
        label="Category"
        defaultValue=""
        onChange={handleChange}
      >
        <MenuItem value="">All</MenuItem>
        {data.subCategories.map((cat, idx) => (
          <MenuItem key={idx} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Categories;
