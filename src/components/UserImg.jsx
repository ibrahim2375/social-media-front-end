import { Box } from "@mui/material";
import React from "react";

function UserImg({ image, size }) {
  return (
    <Box width={size ?? "50px"} height={size ?? "50px"}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size ?? "50px"}
        height={size ?? "50px"}
        alt="user img"
        src={`${import.meta.env.VITE_APP_API}/assets/${image}`}
      />
    </Box>
  );
}

export default UserImg;
