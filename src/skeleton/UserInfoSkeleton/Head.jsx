import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

function Head() {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center" gap="15px">
        {/* profile img */}
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
        {/* name and number of friends */}
        <Box>
          <Skeleton variant="rectangular" width="100px"></Skeleton>
          <Skeleton variant="rectangular" width="100px"></Skeleton>
        </Box>
      </Box>
    </Box>
  );
}

export default Head;
