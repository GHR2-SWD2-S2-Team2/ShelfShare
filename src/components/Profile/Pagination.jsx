import MuiPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Pagination = ({ totalPages, page, onChange }) => {
  return (
    <Stack spacing={2} className="mt-5 self-center">
      <MuiPagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        page={page}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "var(--color-primary)",
            borderColor: "var(--color-primary)",
            "&:hover": {
              backgroundColor: "#33daff4e",
            },
          },
          "& .Mui-selected": {
            backgroundColor: "#33daff4e !important",
          },
        }}
        onChange={onChange}
      />
    </Stack>
  );
};

export default Pagination;
