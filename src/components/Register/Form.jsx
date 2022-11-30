import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  Button,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import DropZone from "react-dropzone";
//icons
import EditIcon from "@mui/icons-material/Edit";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
//redux
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//components
import { CustomInput } from "../CustomInput";
//css
import "../../css/Form.css";
//context
import { ThemeContext } from "../../Hooks/ThemeContext";
//validationSchema
import { RegisterFormSchema } from "../../validation/RegisterFromSchema";
const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};
function Form() {
  const [serverErrors, setServerErrors] = useState("");
  const theme = useContext(ThemeContext);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const isNonMobileScreen = useMediaQuery("(min-width: 768px)");

  // handle submit
  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    const response = await fetch(`http://localhost:5000/auth/register`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data?.error) {
      setServerErrors(data.error);
    } else {
      onSubmitProps.resetForm();
      Navigate("/");
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={RegisterFormSchema}
      >
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

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <CustomInput
                  theme={theme}
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstname}
                  name="firstname"
                  error={
                    Boolean(touched.firstname) && Boolean(errors.firstname)
                  }
                  helperText={touched.firstname && errors.firstname}
                  sx={{
                    width: "40%",
                    color: mode === "light" ? theme.dark : theme.light,
                  }}
                />
                <CustomInput
                  theme={theme}
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
                  name="lastname"
                  error={Boolean(touched.lastname) && Boolean(errors.lastname)}
                  helperText={touched.lastname && errors.lastname}
                  sx={{ width: "40%" }}
                />
              </Box>
              <CustomInput
                theme={theme}
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ width: "100%" }}
              />
              <CustomInput
                theme={theme}
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ width: "100%" }}
              />
              {/* picture section useing dropzone  */}
              <Box
                border={`1px solid ${theme.mainColor}`}
                borderRadius="5px"
                sx={{ width: "100%", height: "56px" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <DropZone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <AddAPhotoIcon sx={{ color: theme.mainColor }} />
                      ) : (
                        <Box
                          display="flex"
                          width="100%"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography>{values.picture.name}</Typography>
                          <EditIcon sx={{ color: theme.mainColor }} />
                        </Box>
                      )}
                    </Box>
                  )}
                </DropZone>
              </Box>

              {/* end of picture section*/}
              <CustomInput
                theme={theme}
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ width: "100%" }}
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
                Register
              </Button>
              <Typography
                sx={{ color: theme.mainColor, cursor: "pointer" }}
                onClick={() => Navigate("/")}
              >
                Already have an account? Login here.
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Form;
