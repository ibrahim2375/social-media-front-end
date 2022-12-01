import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  Button,
  InputBase,
} from "@mui/material";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../redux/index";
//components
import Post from "./Post";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  //get all posts from server
  const getAllPosts = async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_API}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
  };
  //   //   get posts of spcific user
  //   const getUserPosts = async () => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_APP_API}/posts/${userId}`,
  //       {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     const posts = await response.json();
  //     dispatch(setPosts({ posts }));
  //   };
  useEffect(() => {
    getAllPosts();
  }, []);

  if (!posts) {
    return null;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      gap="20px"
    >
      {posts?.length > 0 &&
        posts?.map((post) => <Post key={post?._id} post={post} />)}
    </Box>
  );
}
export default Posts;
