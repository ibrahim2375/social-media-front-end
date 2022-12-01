import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, IconButton } from "@mui/material";
//components
import UserImg from "./UserImg";

//icons
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

//navigation
import { useNavigate, Link } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../redux/index";
//context
import { ThemeContext } from "../Hooks/ThemeContext";
//time ago
import TimeAgo from "react-timeago";
import EnString from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
const formatter = buildFormatter(EnString);

function Friend({ friendId, name, picturePath, postTime, work }) {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const mode = useSelector((state) => state.mode);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  //check if is friend or not
  const isFriend = friends.find((friend) => friend._id === friendId);
  //add or remove friend
  const addOrRemoveFriend = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/user/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      padding="5px"
      backgroundColor={mode === "light" ? theme.light : theme.normalDark}
    >
      <Box display="flex" alignItems="center" gap="20px">
        <UserImg image={picturePath} />
        {/* user data */}
        <a href={`/profile/${friendId}`}>
          {/* if not work try navigate(0)*/}
          <Box>
            <Typography
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            >
              {name ?? null}
            </Typography>
            {postTime && (
              <Typography sx={{ color: "#ccc", fontSize: "10px" }}>
                <TimeAgo date={postTime} formatter={formatter} />
              </Typography>
            )}
            {work && (
              <Typography sx={{ color: "#ccc", fontSize: "10px" }}>
                {work}
              </Typography>
            )}
          </Box>
        </a>
      </Box>
      {/* add and remove user icon */}

      {friendId !== _id && (
        <IconButton onClick={() => addOrRemoveFriend()}>
          {isFriend ? (
            <PersonRemoveIcon
              className="mui_icon"
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            />
          ) : (
            <PersonAddAltIcon
              className="mui_icon"
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            />
          )}
        </IconButton>
      )}
    </Box>
  );
}

export default Friend;
