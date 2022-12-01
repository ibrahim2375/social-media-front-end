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
import PostSkeleton from "../../skeleton/PostSkeleton";

function Posts() {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  //get all posts from server
  const getAllPosts = async () => {
    setloading(true);
    const response = await fetch(`${import.meta.env.VITE_APP_API}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setloading(false);
  };
  //   //   get posts of spcific user
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
      {loading
        ? Array.from({ length: 10 }).map((s, i) => <PostSkeleton key={i} />)
        : posts?.length > 0 &&
          posts?.map((post) => <Post key={post?._id} post={post} />)}
    </Box>
  );
}
export default Posts;
