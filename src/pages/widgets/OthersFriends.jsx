import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import { ThemeContext } from "../../Hooks/ThemeContext";
//components
import Friend from "../../components/Friend";
//skeleton components
import ContactSkeleton from "../../skeleton/ContactSkeleton";
//redux
import { setOthersFriends } from "../../redux/index";
import { useSelector, useDispatch } from "react-redux";

function OthersFriends({ userId }) {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const theme = useContext(ThemeContext);
  const mode = useSelector((state) => state.mode);
  const friends = useSelector((state) => state.othersFriends);

  const getUserFriends = async () => {
    setloading(true);
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/user/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const othersFriends = await response.json();
    dispatch(setOthersFriends({ othersFriends }));
    setloading(false);
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
        Followers
      </Typography>
      {loading ? (
        <ContactSkeleton />
      ) : (
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
              friendId={contact._id}
              name={`${contact?.firstname} ${contact?.lastname}`}
              work={contact?.occupation}
              picturePath={contact?.picturePath}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default OthersFriends;
