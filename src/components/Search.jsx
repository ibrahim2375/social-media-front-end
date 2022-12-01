import React, { useState, useContext, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
//context
import { ThemeContext } from "../Hooks/ThemeContext";
//redux
import { setRecentSearch } from "../redux/index";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
//components
import UserImg from "./UserImg";
import ResentUsersSection from "./ResentUsersSection";
//css
import "../css/Search.css";
function Search({ setSearchSection }) {
  const [loading, setloading] = useState(false);
  const [recentSearchedUsers, setRecentSearchedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const recentUsers = useSelector((state) => state.recentSearch);
  //   const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width: 990px)");
  //   heandle search
  const findUsers = async () => {
    setloading(true);
    const response = await fetch(`${import.meta.env.VITE_APP_API}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search: searchQuery }),
    });
    const data = await response.json();
    if (!data?.msg || !data?.error) {
      setRecentSearchedUsers(data);
      setloading(false);
    }
  };

  return (
    <Box
      className="search_section"
      position="fixed"
      zIndex="999"
      top="0"
      left="0"
      //   width={!isNonMobileScreen && "100%"}
      padding="1rem 2rem"
      backgroundColor={mode === "light" ? theme.light : theme.normalDark}
      boxShadow=" 0 0 .5rem 0 rgba(0, 0, 0, .2)"
      borderRadius="10px"
      display="flex"
      flexDirection="column"
      justifyContent="ceneter"
      alignItems="center"
      gap="20px"
    >
      {/* head seatch and back */}
      <Box display="flex" justifyContent="space-between" alignItems="ceneter">
        <IconButton onClick={() => setSearchSection(false)}>
          <ArrowBackIcon
            sx={{ color: mode === "light" ? theme.dark : theme.light }}
          />
        </IconButton>
        <Box>
          <InputBase
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => findUsers()}
          >
            <SearchIcon sx={{ color: "#ccc" }} />
          </IconButton>
        </Box>
      </Box>
      {/* recent search */}
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        gap="20px"
        width="100%"
      >
        {/* recent search users*/}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : recentSearchedUsers.length === 0 ? (
          <></>
        ) : (
          recentSearchedUsers?.map((user, index) => (
            <ResentUsersSection key={index} user={user} id={user._id} />
          ))
        )}
        {/* recent search users*/}
      </Box>
      {/* recent search */}
    </Box>
  );
}

export default Search;
