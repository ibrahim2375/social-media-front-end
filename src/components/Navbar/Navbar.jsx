import React, { useState, useContext } from "react";
import { Typography, useMediaQuery } from "@mui/material";
import InputBase from "@mui/material/InputBase";
// import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
//icons
import { DarkMode, LightMode } from "@mui/icons-material";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import HomeIcon from "@mui/icons-material/Home";
//redux
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMode } from "../../redux/index";
//context
import { ThemeContext } from "../../Hooks/ThemeContext";
//components
import BadgeAvatars from "./userAvatar";
import BoxList from "./MobileBoxList";
import Search from "../Search";
//css
import "../../css/Navbar.css";

function Navbar() {
  const [searchSection, setSearchSection] = useState(false);
  const [showNavList, setShowNavList] = useState(false);
  const theme = useContext(ThemeContext);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  //   const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  // const fullName = `${user.firstname} ${user.lastname}`;
  const isNonMobileScreen = useMediaQuery("(min-width: 990px)");
  return (
    <nav
      style={{
        backgroundColor: mode === "light" ? theme.light : theme.normalDark,
        position: "sticky",
        top: 0,
        zIndex: 90,
      }}
    >
      <div className="left_side">
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#33DDFB"
          sx={{ cursor: "pointer" }}
          onClick={() => Navigate("/")}
        >
          SocialM
        </Typography>
        <InputBase
          onFocus={() => setSearchSection(true)}
          sx={{
            ml: 1,
            flex: 1,
            backgroundColor: mode === "dark" ? "#333" : "",
            border: mode === "light" && "1px solid #ccc",
            borderRadius: "10px",
            color: mode === "light" ? theme.dark : theme.light,
            paddingLeft: "10px",
          }}
          placeholder="Search...."
        />
        {/* <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon sx={{ color: "#ccc" }} />
        </IconButton> */}
      </div>
      <div className="right_side">
        {isNonMobileScreen && (
          <div className="desktop_screen_icons">
            <IconButton onClick={() => Navigate("/home")}>
              <HomeIcon
                className="mui_icon"
                sx={{ color: mode === "light" ? theme.dark : theme.light }}
              />
            </IconButton>
            <IconButton onClick={() => dispatch(setMode())}>
              {mode === "light" ? (
                <LightMode
                  sx={{ color: mode === "light" ? theme.dark : theme.light }}
                />
              ) : (
                <DarkMode
                  sx={{ color: mode === "light" ? theme.dark : theme.light }}
                />
              )}
            </IconButton>
            <MessageIcon
              className="mui_icon"
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            />
            <NotificationsIcon
              className="mui_icon"
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            />
            <HelpCenterIcon
              className="mui_icon"
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            />
          </div>
        )}
        <IconButton onClick={() => setShowNavList(!showNavList)}>
          <BadgeAvatars />
        </IconButton>
      </div>
      {showNavList && <BoxList />}
      {searchSection && <Search setSearchSection={setSearchSection} />}
    </nav>
  );
}

export default Navbar;
