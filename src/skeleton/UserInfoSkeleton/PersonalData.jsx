import React from "react";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

function PersonalData() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="10px"
    >
      {/* location */}
      <Box display="flex" alignItems="center" gap="10px">
        <Skeleton variant="circular" width="20px" height="20px">
          <Avatar />
        </Skeleton>
        <Skeleton variant="rectangular" width="100px"></Skeleton>
      </Box>
      {/* work */}
      <Box display="flex" alignItems="center" gap="10px">
        <Skeleton variant="circular" width="20px" height="20px">
          <Avatar />
        </Skeleton>
        <Skeleton variant="rectangular" width="100px"></Skeleton>
      </Box>
    </Box>
  );
}

export default PersonalData;
