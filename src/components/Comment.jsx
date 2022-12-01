import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
//components
import UserImg from "./UserImg";
import { useSelector, useDispatch } from "react-redux";
//context
import { ThemeContext } from "../Hooks/ThemeContext";

function Comment({ userId, comment }) {
  const mode = useSelector((state) => state.mode);
  const theme = useContext(ThemeContext);
  return (
    <Box display="flex" alignItems="flex-start" gap="10px">
      {/* user profile */}
      <a href={`/profile/${userId}`}>
        <UserImg image={comment?.picturePath} size={"30px"} />
      </a>
      {/* comment */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap="5px"
        padding="5px 15px"
        backgroundColor={mode === "dark" && "#333"}
        borderRadius="20px"
        border={mode === "light" && "1px solid #ccc"}
      >
        <Typography
          sx={{
            color: mode === "light" ? theme.dark : theme.light,
            fontSize: "14px",
          }}
        >
          {comment?.userName}
        </Typography>
        <Typography sx={{ color: "#ccc", fontSize: "12px" }}>
          {comment?.comment}
        </Typography>
      </Box>
    </Box>
  );
}

export default Comment;
