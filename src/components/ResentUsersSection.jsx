import React, { useContext } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
//context
import { ThemeContext } from "../Hooks/ThemeContext";
//components
import UserImg from "./UserImg";
//css
import "../css/Search.css";
import { useSelector } from "react-redux";
function ResentUsersSection({ user, removeRecentUser, id }) {
  const theme = useContext(ThemeContext);
  const mode = useSelector((state) => state.mode);

  return (
    <a href={`/profile/${id}`}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        boxShadow=" 0 0 .5rem 0 rgba(0, 0, 0, .2)"
        padding="10px"
        cursor="pointer"
        borderRadius="10px"
      >
        <Box display="flex" alignItems="center" gap="20px">
          <UserImg image={user?.picturePath} size={"30px"} />
          <Typography
            sx={{ color: mode === "light" ? theme.dark : theme.light }}
          >
            {user?.firstname + " " + user?.lastname}
          </Typography>
        </Box>
        {/* remove icon */}
        {/* <CloseIcon
        onClick={() => //removeRecentUser(id)}
        className="mui_icon"
        sx={{ color: mode === "light" ? theme.dark : theme.light }}
      /> */}
      </Box>
    </a>
  );
}

export default ResentUsersSection;
