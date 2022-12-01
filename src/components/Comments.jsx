import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Divider, IconButton, InputBase } from "@mui/material";
// icons
import SendIcon from "@mui/icons-material/Send";
//components
import UserImg from "./UserImg";
import Comment from "./Comment";
//navigation
import { useNavigate, Link } from "react-router-dom";
//redux
import { setPost } from "../redux/index";
import { useSelector, useDispatch } from "react-redux";
//context
import { ThemeContext } from "../Hooks/ThemeContext";

function Comments({ postId, userId, fullName, comments }) {
  const [comment, setComment] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const mode = useSelector((state) => state.mode);
  const { picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  // handleComments
  const handleComments = async () => {
    if (comment.trim() === "") {
      setComment("");
    } else {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/posts/update/${postId}/comment`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, comment, fullName, picturePath }),
        }
      );
      const updatePost = await response.json();
      dispatch(setPost({ post: updatePost }));
      setComment("");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="10px"
      backgroundColor={mode === "light" ? theme.light : theme.normalDark}
    >
      {/* image and input comment */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="20px"
      >
        <UserImg image={picturePath} size={"35px"} />
        <InputBase
          placeholder="Write a Comment ..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          sx={{
            width: "100%",
            borderRadius: "10px",
            backgroundColor: mode === "dark" ? "#333" : "",
            paddingLeft: "15px",
            border: mode === "light" && "1px solid #ccc",
          }}
        />
        {/* send button */}
        <IconButton onClick={() => handleComments()}>
          <SendIcon
            className="mui_icon"
            sx={{ color: mode === "light" ? theme.dark : theme.light }}
          />
        </IconButton>
      </Box>
      {/* comments */}
      {/* {comments?.length !== 0 &&()} */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap="20px"
      >
        {comments?.length !== 0 &&
          comments?.map((comment, index) => (
            <Comment key={index} comment={comment} userId={comment?.id} />
          ))}
      </Box>

      {/* comments */}
    </Box>
  );
}

export default Comments;
