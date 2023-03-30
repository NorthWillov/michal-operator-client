import React from "react";
import { Box, CircularProgress } from "@mui/material";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress
        color="primary"
        size={60}
        thickness={5}
        sx={{ margin: "0 auto" }}
      />
    </Box>
  );
}

export default Loader;
