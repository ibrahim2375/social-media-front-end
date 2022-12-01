import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import { ThemeContext } from "../../Hooks/ThemeContext";
//components
import Friend from "../../components/Friend";

//redux
import { setFriends } from "../../redux/index";
import { useSelector, useDispatch } from "react-redux";

function FriendsList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const theme = useContext(ThemeContext);
  const mode = useSelector((state) => state.mode);
  const friends = useSelector((state) => state.user.friends);

  const getUserFriends = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/user/${user?._id}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const friends = await response.json();
    dispatch(setFriends({ friends }));
  };

  useEffect(() => {
    getUserFriends();
  }, []);
  if (!friends) {
    return null;
  }
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
      <Typography
        sx={{
          color: mode === "light" ? theme.dark : theme.light,
        }}
      >
        Contacts
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap="10px"
        // boxShadow="0 0 .5rem 0 rgba(0, 0, 0, .2)"
      >
        {friends?.map((contact, index) => (
          <Friend
            key={index}
            friendId={contact?._id}
            name={`${contact?.firstname} ${contact?.lastname}`}
            work={contact?.occupation}
            picturePath={contact?.picturePath}
          />
        ))}
      </Box>
    </Box>
  );
}

export default FriendsList;
