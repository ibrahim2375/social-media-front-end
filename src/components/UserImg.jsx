import { Box } from "@mui/material";
import React from "react";
//skeleton to img
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

function UserImg({ image, size }) {
  return (
    <Box width={size ?? "50px"} height={size ?? "50px"}>
      {image === undefined || image === null || !image ? (
        <Skeleton variant="circular" width={size} height={size}>
          <Avatar />
        </Skeleton>
      ) : (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size ?? "50px"}
          height={size ?? "50px"}
          alt="user img"
          src={
            image === undefined
              ? null
              : `${import.meta.env.VITE_APP_API}/assets/${image}`
          }
        />
      )}
    </Box>
  );
}

export default UserImg;
