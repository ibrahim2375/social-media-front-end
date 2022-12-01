import React, { useContext } from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Typography, useMediaQuery } from "@mui/material";
//icons
import { DarkMode, LightMode } from "@mui/icons-material";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeIcon from "@mui/icons-material/Home";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setMode, setLogout } from "../../redux/index";
//context
import { ThemeContext } from "../../Hooks/ThemeContext";
import { Link } from "react-router-dom";
export default function MenuItems() {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  // const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 990px)");
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: mode === "light" ? theme.light : theme.normalDark,
        boxShadow: "none",
        borderRadius: "0px",
      }}
    >
      {!isNonMobileScreen && (
        <MenuList>
          {/* Home */}
          {/* <MenuItem>
            <ListItemIcon>
              <HomeIcon
                className="mui_icon"
                sx={{ color: mode === "light" ? theme.dark : theme.light }}
              />
            </ListItemIcon>
            <Typography
              variant="inherit"
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            >
              Home
            </Typography>
          </MenuItem> */}
          {/* change mode */}
          <MenuItem onClick={() => dispatch(setMode())}>
            <ListItemIcon>
              {mode === "light" ? (
                <LightMode
                  sx={{ color: mode === "light" ? theme.dark : theme.light }}
                />
              ) : (
                <DarkMode
                  sx={{ color: mode === "light" ? theme.dark : theme.light }}
                />
              )}
              {/* <SendIcon fontSize="small" /> */}
            </ListItemIcon>
            <Typography
              variant="inherit"
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            >
              Change Mode
            </Typography>
          </MenuItem>
          {/* message */}
          <MenuItem>
            <ListItemIcon>
              <MessageIcon
                className="mui_icon"
                sx={{ color: mode === "light" ? theme.dark : theme.light }}
              />
            </ListItemIcon>
            <Typography
              variant="inherit"
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            >
              Messsanger
            </Typography>
          </MenuItem>
          {/* Help */}
          <MenuItem>
            <ListItemIcon>
              <HelpCenterIcon
                className="mui_icon"
                sx={{ color: mode === "light" ? theme.dark : theme.light }}
              />
            </ListItemIcon>
            <Typography
              variant="inherit"
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            >
              Help & supports
            </Typography>
          </MenuItem>
          {/* notification */}
          <MenuItem>
            <ListItemIcon>
              <NotificationsIcon
                className="mui_icon"
                sx={{ color: mode === "light" ? theme.dark : theme.light }}
              />
            </ListItemIcon>
            <Typography
              variant="inherit"
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            >
              Notifications
            </Typography>
          </MenuItem>
        </MenuList>
      )}
      {/* logout */}
      <MenuList>
        <MenuItem onClick={() => dispatch(setLogout())}>
          <ListItemIcon>
            <LogoutOutlinedIcon
              className="mui_icon"
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            />
          </ListItemIcon>
          <Typography
            variant="inherit"
            sx={{ color: mode === "light" ? theme.dark : theme.light }}
          >
            LogOut
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
