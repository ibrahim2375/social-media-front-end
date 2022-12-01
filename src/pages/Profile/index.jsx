import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";

//components
import Navbar from "../../components/Navbar/Navbar";
import UserImg from "../../components/UserImg";
import UserInfo from "../widgets/UserInfo";
import MyPost from "../widgets/MyPost";
import Post from "../widgets/Post";
import AddRemoveFriendButton from "../../components/AddRemoveFriendButton";
//redux
import { setUserPosts } from "../../redux/index";
import { useSelector, useDispatch } from "react-redux";
//context
import { ThemeContext } from "../../Hooks/ThemeContext";
//react router dom
import { useParams } from "react-router-dom";
function Profile() {
  const [userData, setUserData] = useState(null);
  const param = useParams();
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const mode = useSelector((state) => state.mode);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  // user POSTS
  const userPosts = useSelector((state) => state.userPosts);
  const isNonMobileScreen = useMediaQuery("(min-width: 990px)");
  // handel user data
  const getUserData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/user/${param?.userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUserData(data);
  };
  //    get posts of spcific user
  const getUserPosts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/posts/${param?.userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const userPosts = await response.json();
    dispatch(setUserPosts({ userPosts }));
  };

  if (!userPosts) {
    return null;
  }
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <Box>
      <Navbar />
      <Box>
        {/* head profile page */}
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Box backgroundColor="black" height="100px" width="100%"></Box>
          {/* img and name */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding=" 1rem 3rem"
          >
            <Box display="flex" alignItems="center" gap="30px">
              {/* profile img */}
              {/* {isNonMobileScreen ? ( */}
              {/* <UserImg image={userData?.picturePath} size={"170px"} /> */}
              {/* // ) : ( */}
              <UserImg image={userData?.picturePath} size={"70px"} />
              {/* // )} */}

              {/* name and number of friends */}
              <Box>
                <Typography
                  sx={{ color: mode === "light" ? theme.dark : theme.light }}
                >
                  {userData?.firstname + " " + userData?.lastname}
                </Typography>
                <Typography sx={{ color: "#ccc", fontSize: "16px" }}>
                  {userData?.friends?.length} Friends
                </Typography>
              </Box>
            </Box>
            {/* add friend */}
            <AddRemoveFriendButton friendId={param?.userId} />
            {/* end of add friend */}
          </Box>
          {/* img and name */}
        </Box>
        <Divider />
        {/* head profile page */}
        {/* components */}
        <Box
          widht="100%"
          display={"flex"}
          flexDirection={isNonMobileScreen ? "row" : "column"}
          justifyContent="center"
          gap="1.5rem"
          padding="20px"
        >
          <Box flexBasis={isNonMobileScreen ? "30%" : undefined}>
            <UserInfo
              userId={param?.userId}
              picturePath={userData?.picturePath}
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="20px"
            flexBasis={isNonMobileScreen ? "40%" : undefined}
          >
            {user?._id === param?.userId && (
              <MyPost picturePath={user?.picturePath} />
            )}
            {userPosts?.length > 0 &&
              userPosts?.map((post) => <Post key={post?._id} post={post} />)}
          </Box>
        </Box>
        {/* components */}
      </Box>
    </Box>
  );
}

export default Profile;
