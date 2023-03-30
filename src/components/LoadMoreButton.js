import React from "react";
import Button from "@mui/material/Button";

const LoadMoreButton = (props) => {
  const { onClick } = props;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        Zobacz więcej
      </Button>
    </div>
  );
};

export default LoadMoreButton;
