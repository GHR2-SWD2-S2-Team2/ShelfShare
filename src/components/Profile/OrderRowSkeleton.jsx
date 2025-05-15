import React from "react";
import {
  Skeleton,
  Paper,
  Box,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const OrderRowSkeleton = () => {
  return (
    <Box
      component="ul"
      sx={{ listStyle: "none", p: 0, m: 0 }}
      className="w-full"
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          mb: 2,
          p: 3,
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width={120} height={24} />
          </Box>
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2} mt={2}>
          {[...Array(4)].map((_, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <Skeleton variant="text" width={60} />
              </Typography>
              <Skeleton variant="text" width="80%" />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default OrderRowSkeleton;
