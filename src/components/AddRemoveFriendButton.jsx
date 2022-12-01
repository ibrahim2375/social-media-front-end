import React, { useContext } from "react";
import { Box, IconButton } from "@mui/material";

//icons
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../redux/index";
//context
import { ThemeContext } from "../Hooks/ThemeContext";

function AddRemoveFriendButton({ friendId }) {
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
    <Box>
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

export default AddRemoveFriendButton;
