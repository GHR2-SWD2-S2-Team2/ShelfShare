import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../app/features/FiltersSlice";

const Pages = () => {
  const {
    totalPages,
    filters: { page },
  } = useSelector((state) => state.booksFilters);
  const dispatch = useDispatch();
  return (
    <Stack spacing={2} className="mt-5 self-center">
      <Pagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        page={page}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "var(--color-primary)",
            borderColor: "var(--color-primary)",
            "&:hover": {
              backgroundColor: "#ff8e0455",
            },
          },
          "& .Mui-selected": {
            backgroundColor: "#ff8e0455 !important",
          },
        }}
        onChange={(_, newPage) => {
          dispatch(setFilter({ page: newPage }));
        }}
      />
    </Stack>
  );
};

export default Pages;
