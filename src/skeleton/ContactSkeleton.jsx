import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
//skeleton components
import FriendSkeleton from "./FriendSkeleton";

function ContactSkeleton() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="10px"
      // boxShadow="0 0 .5rem 0 rgba(0, 0, 0, .2)"
    >
      {Array.from({ length: 3 }).map((s, i) => (
        <FriendSkeleton key={i} />
      ))}
    </Box>
  );
}

export default ContactSkeleton;
