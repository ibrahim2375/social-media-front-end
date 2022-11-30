import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
//components
import Nav from "../../components/LoginRegisterNav";
import Form from "../../components/Register/Form";

function Register() {
  const isNonMobileScreen = useMediaQuery("(min-width: 990px)");
  return (
    <Box>
      <Nav />
      <Form />
    </Box>
  );
}

export default Register;
