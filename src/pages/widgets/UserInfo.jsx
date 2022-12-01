import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
//icons
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import WorkIcon from "@mui/icons-material/Work";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
//css
//skeleton components
import Head from "../../skeleton/UserInfoSkeleton/Head";
import PersonalData from "../../skeleton/UserInfoSkeleton/PersonalData";

//components
import UserImg from "../../components/UserImg";
//redux
import { useSelector } from "react-redux";
//context
import { ThemeContext } from "../../Hooks/ThemeContext";
//navigation
import { useNavigate, Link } from "react-router-dom";

function UserWidget({ userId, picturePath }) {
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState(null);
  const theme = useContext(ThemeContext);
  const token = useSelector((state) => state.token);
  const mode = useSelector((state) => state.mode);
  const Navigate = useNavigate();

  //get user Information
  const getUser = async () => {
    setloading(true);
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/user/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
    setloading(false);
  };

  useEffect(() => {
    getUser();
  }, []);
  //check user inf if exist
  if (!user) {
    return null;
  }
  const fullName = `${user?.firstname} ${user?.lastname}`;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="20px"
      padding="15px"
      borderRadius="5px"
      backgroundColor={mode === "light" ? theme.light : theme.normalDark}
      boxShadow=" 0 0 .5rem rgba(0,0,0,.2)"
    >
      {/* img and name */}
      {loading ? (
        <Head />
      ) : (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Link to={`/profile/${userId}`}>
            <Box display="flex" alignItems="center" gap="15px">
              {/* profile img */}
              <UserImg image={picturePath} />
              {/* name and number of friends */}
              <Box>
                <Typography
                  sx={{ color: mode === "light" ? theme.dark : theme.light }}
                >
                  {fullName}
                </Typography>

                <Typography sx={{ color: "#ccc", fontSize: "10px" }}>
                  {user?.friends?.length} Followers
                </Typography>
              </Box>
            </Box>
          </Link>
        </Box>
      )}

      <Divider />
      {/* location and work */}
      {loading ? (
        <PersonalData />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap="10px"
        >
          {/* location */}
          <Box display="flex" alignItems="center" gap="10px">
            <RoomOutlinedIcon
              className="mui_icon"
              sx={{ color: mode === "light" ? theme.dark : theme.light }}
            />
            <Typography
              sx={{
                color: mode === "light" ? theme.dark : theme.light,
                fontSize: "16px",
              }}
            >
              {user?.location}
            </Typography>
          </Box>
          {/* work */}
          <Box display="flex" alignItems="center" gap="10px">
            <WorkIcon
              className="mui_icon"
              sx={{
                color: mode === "light" ? theme.dark : theme.light,
              }}
            />
            <Typography
              sx={{
                color: mode === "light" ? theme.dark : theme.light,
                fontSize: "16px",
              }}
            >
              {user?.occupation}
            </Typography>
          </Box>
        </Box>
      )}

      {/* social media profile */}
      <Divider />
      {loading ? (
        <PersonalData />
      ) : (
        <Box>
          <Typography
            sx={{
              color: mode === "light" ? theme.dark : theme.light,
              marginBottom: "10px",
            }}
          >
            Social Profile
          </Typography>

          {/* links */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap="10px"
          >
            {/* twitter */}
            <Box display="flex" alignItems="center" gap="10px">
              <TwitterIcon
                className="mui_icon"
                sx={{ color: mode === "light" ? theme.dark : theme.light }}
              />
              <Typography
                sx={{
                  color: mode === "light" ? theme.dark : theme.light,
                  fontSize: "16px",
                }}
              >
                Twitter
              </Typography>
            </Box>
            {/* linkedIn */}
            <Box display="flex" alignItems="center" gap="10px">
              <LinkedInIcon
                className="mui_icon"
                sx={{ color: mode === "light" ? theme.dark : theme.light }}
              />
              <Typography
                sx={{
                  color: mode === "light" ? theme.dark : theme.light,
                  fontSize: "16px",
                }}
              >
                LinkedIn
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default UserWidget;
