import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
//context
import { ThemeContext } from "../Hooks/ThemeContext";
//redux
import { useSelector } from "react-redux";

function LoginRegisterNav() {
  const theme = useContext(ThemeContext);
  const mode = useSelector((state) => state.mode);
  return (
    <Box
      padding="20px"
      textAlign="center"
      backgroundColor={mode === "light" ? theme.light : theme.normalDark}
      boxShadow=" 0 0 .5rem rgba(0,0,0,.2)"
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        color={theme.mainColor}
        sx={{ cursor: "pointer" }}
      >
        SocialM
      </Typography>
    </Box>
  );
}

export default LoginRegisterNav;
