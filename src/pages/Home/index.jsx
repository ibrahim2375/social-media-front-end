import React from "react";
import { Box, useMediaQuery } from "@mui/material";
//redux
import { useSelector } from "react-redux";
//components
import Navbar from "../../components/Navbar/Navbar";
import UserInfo from "../widgets/UserInfo";
import MyPost from "../widgets/MyPost";
import Posts from "../widgets/Posts";
import Advertisement from "../widgets/Advertisement";
import FriendsList from "../widgets/FriendsList";

function Home() {
  const { _id, picturePath } = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 990px)");
  return (
    <Box>
      <Navbar />
      <Box
        widht="100%"
        display={"flex"}
        flexDirection={isNonMobileScreen ? "row" : "column"}
        justifyContent="space-between"
        gap="0.5rem"
        padding="20px"
      >
        {isNonMobileScreen && (
          <Box flexBasis={isNonMobileScreen ? "25%" : undefined}>
            <UserInfo userId={_id} picturePath={picturePath} />
          </Box>
        )}

        <Box
          display="flex"
          flexDirection="column"
          gap="20px"
          flexBasis={isNonMobileScreen ? "45%" : undefined}
        >
          <MyPost picturePath={picturePath} />
          <Posts />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "25%" : undefined}
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          gap="0.5rem"
        >
          <Advertisement />
          <FriendsList userId={_id} />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
