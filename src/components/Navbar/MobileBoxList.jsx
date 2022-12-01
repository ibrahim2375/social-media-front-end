import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
//components
import UserAvatar from "./userAvatar";
import MenuItems from "./MenuItems";
//redux
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMode } from "../../redux/index";
//context
import { ThemeContext } from "../../Hooks/ThemeContext";
function MobileBoxList() {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const fullName = `${user?.firstname} ${user?.lastname}`;
  return (
    <Box
      position="fixed"
      top="60px"
      right="10px"
      minWidth="250px"
      maxWidth="500px"
      zIndex="99"
      boxShadow=" 0 0 .5rem rgba(0,0,0,.5)"
      padding="10px 20px 30px 20px"
      borderRadius="10px"
      backgroundColor={mode === "light" ? theme.light : theme.normalDark}
    >
      <a href={`/profile/${user?._id}`}>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap="10px"
          boxShadow=" 0 0 .5rem rgba(0,0,0,.2)"
          padding="10px"
          borderRadius="5px"
          marginBottom="5px"
        >
          <UserAvatar />
          <Typography
            sx={{ color: mode === "light" ? theme.dark : theme.light }}
          >
            {fullName ?? null}
          </Typography>
        </Box>
      </a>
      <Box position="relative">
        <MenuItems />
      </Box>
    </Box>
  );
}

export default MobileBoxList;
