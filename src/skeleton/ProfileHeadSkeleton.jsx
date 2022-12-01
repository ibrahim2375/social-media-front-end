import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
function ProfileHeadSkeleton() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding=" 1rem 3rem"
    >
      <Box display="flex" alignItems="center" gap="30px">
        <Skeleton variant="circular" width="70px" height="70px">
          <Avatar />
        </Skeleton>

        {/* name and number of friends */}
        <Box>
          <Skeleton variant="rectangular" width="100px"></Skeleton>
          <Skeleton width="60%"></Skeleton>
        </Box>
      </Box>
      {/* add friend */}
      <Skeleton variant="circular" width="20px" height="20px">
        <Avatar />
      </Skeleton>
      {/* end of add friend */}
    </Box>
  );
}

export default ProfileHeadSkeleton;
