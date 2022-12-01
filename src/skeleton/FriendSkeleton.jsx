import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

function FriendSkeleton() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      padding="5px"
    >
      <Box display="flex" alignItems="center" gap="20px">
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
        {/* user data */}
        {/* if not work try navigate(0)*/}
        <Box>
          <Skeleton width="100px" />
          <Skeleton width="60%" />
        </Box>
      </Box>
      {/* add and remove user icon */}

      <Skeleton variant="circular" />
      {/* <Avatar /> */}
    </Box>
  );
}

export default FriendSkeleton;
