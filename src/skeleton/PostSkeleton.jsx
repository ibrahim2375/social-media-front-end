import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
//skeleton components
import FriendSkeleton from "./FriendSkeleton";
//redux
import { useSelector } from "react-redux";
//context
import { ThemeContext } from "../Hooks/ThemeContext";
function PostSkeleton() {
  const theme = useContext(ThemeContext);
  const mode = useSelector((state) => state.mode);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="20px"
      padding="10px 15px"
      borderRadius="5px"
      backgroundColor={mode === "light" ? theme.light : theme.normalDark}
      boxShadow="0 0 .5rem 0 rgba(0, 0, 0, .2)"
    >
      <FriendSkeleton />
      {/* description */}
      <Skeleton width="100%"></Skeleton>
      <Skeleton width="100%"></Skeleton>
      <Skeleton width="60%"></Skeleton>
      {/* img */}
      <Box>
        <Skeleton variant="rectangular" width="100%"></Skeleton>
      </Box>
      <Divider />
      {/* like and comments */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="20px"
        >
          {/* like and unlike */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="5px"
          >
            <Skeleton variant="circular" width="20px" height="20px">
              <Avatar />
            </Skeleton>
            {/* number of likes */}
          </Box>
          {/* comments */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="5px"
          >
            <Skeleton variant="circular" width="20px" height="20px">
              <Avatar />
            </Skeleton>
          </Box>
        </Box>
        {/* share */}
        <Skeleton variant="circular" width="20px" height="20px">
          <Avatar />
        </Skeleton>
      </Box>

      {/* comments section 
      {isthereComments && (
        <>
           <Divider /> 
          <Comments
            postId={post?._id}
            userId={currentUserId}
            fullName={currentUserFullName}
            comments={post?.comments}
          />
        </>
      )}
       comments section */}
    </Box>
  );
}

export default PostSkeleton;
