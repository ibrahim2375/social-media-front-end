import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  Button,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
//components
import { CustomInput } from "../CustomInput";
//redux
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../redux/index";
//validationSchema
import { LoginFormSchema } from "../../validation/LoginFormSchema";
//css
import "../../css/Form.css";
//context
import { ThemeContext } from "../../Hooks/ThemeContext";

const initialValues = {
  email: "",
  password: "",
};
function Form() {
  const [serverErrors, setServerErrors] = useState("");
  const theme = useContext(ThemeContext);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const isNonMobileScreen = useMediaQuery("(min-width: 768px)");

  const handleFormSubmit = async (values, onSubmitProps) => {
    const response = await fetch(`http://localhost:5000/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    console.log(data);
    if (data?.msg) {
      setServerErrors(data?.msg);
    } else {
      onSubmitProps.resetForm();
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );
      Navigate("/home");
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={LoginFormSchema}
      >
        {/*   */}
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="20px"
              boxShadow={
                isNonMobileScreen ? "0 0 .5rem rgba(0,0,0,.2)" : "none"
              }
              padding="15px"
              borderRadius="5px"
              backgroundColor={
                mode === "light" ? theme.light : theme.normalDark
              }
            >
              {/* errors message */}
              <Typography sx={{ color: "red" }}>{serverErrors}</Typography>
              {/* errors message */}
              <CustomInput
                // id="email_input"
                theme={theme}
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  width: "100%",
                  borderColor: mode === "light" ? "#ccc" : "white",
                }}
                // focused
              />
              <CustomInput
                theme={theme}
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ width: "100%" }}
              />
              {/* button */}
              <Button
                type="submit"
                sx={{
                  backgroundColor: theme.mainColor,
                  color: mode === "light" ? theme.dark : theme.light,
                  width: "100%",
                }}
              >
                Login
              </Button>
              <Typography
                sx={{ color: theme.mainColor, cursor: "pointer" }}
                onClick={() => Navigate("/register")}
              >
                Don't have an account? Sign Up here.
              </Typography>
            </Box>
          </form>
        )}
        {/* */}
      </Formik>
    </>
  );
}

export default Form;
