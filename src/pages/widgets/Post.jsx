import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import { ThemeContext } from "../../Hooks/ThemeContext";
//icons
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
//components
import Friend from "../../components/Friend";
import Comments from "../../components/Comments";
//redux
import { setPost } from "../../redux/index";
import { useSelector, useDispatch } from "react-redux";

function Post({ post }) {
  const dispatch = useDispatch();
  const [isthereComments, setIsThereComments] = useState(false);
  const currentUserId = useSelector((state) => state.user?._id);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const theme = useContext(ThemeContext);
  const mode = useSelector((state) => state.mode);
  //   check like or not
  const isLiked = Boolean(post.likes[currentUserId]);
  //   number of likes
  const NumberOfLikes = Object.keys(post.likes).length;
  //current user fullName
  const currentUserFullName = `${user?.firstname} ${user?.lastname}`;
  //posts user fullName
  const postUserFullName = `${post?.firstname} ${post?.lastname}`;
  // like or not
  const handleLikes = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/posts/update/${post?._id}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUserId }),
      }
    );
    const updatePost = await response.json();
    dispatch(setPost({ post: updatePost }));
  };
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
      <Friend
        friendId={post?.userId}
        name={postUserFullName}
        picturePath={post?.userPicturePath}
        postTime={post?.createdAt}
      />
      {/* description */}
      <Typography
        sx={{
          color: mode === "light" ? theme.dark : theme.light,
        }}
      >
        {post?.description}
      </Typography>
      {/* img */}
      <Box>
        {post?.picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post img"
            style={{ borderRadius: "5px" }}
            src={`${import.meta.env.VITE_APP_API}/assets/${post?.picturePath}`}
          />
        )}
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
            <IconButton onClick={handleLikes}>
              {isLiked ? (
                <ThumbUpIcon
                  className="mui_icon"
                  sx={{ color: theme.mainColor }}
                />
              ) : (
                <ThumbUpOffAltIcon
                  className="mui_icon"
                  sx={{ color: mode === "light" ? theme.dark : theme.light }}
                />
              )}
            </IconButton>
            {/* number of likes */}
            <Typography
              sx={{
                color: mode === "light" ? theme.dark : theme.light,
              }}
            >
              {NumberOfLikes}
            </Typography>
          </Box>
          {/* comments */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="5px"
          >
            <IconButton onClick={() => setIsThereComments(!isthereComments)}>
              <ModeCommentIcon
                // className="mui_icon"
                sx={{
                  color: mode === "light" ? theme.dark : theme.light,
                  cursor: "pointer",
                }}
              />
            </IconButton>
            {/* number of comments */}
            <Typography
              sx={{
                color: mode === "light" ? theme.dark : theme.light,
              }}
            >
              {post?.comments?.length}
            </Typography>
          </Box>
        </Box>
        {/* share */}
        <ShareIcon
          // className="mui_icon"
          sx={{
            color: mode === "light" ? theme.dark : theme.light,
            cursor: "pointer",
          }}
        />
      </Box>

      {/* comments section */}
      {isthereComments && (
        <>
          {/* <Divider /> */}
          <Comments
            postId={post?._id}
            userId={currentUserId}
            fullName={currentUserFullName}
            comments={post?.comments}
          />
        </>
      )}
      {/* comments section */}
    </Box>
  );
}

export default Post;
