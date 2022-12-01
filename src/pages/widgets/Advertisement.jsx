import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//redux
import { useSelector } from "react-redux";
//context
import { ThemeContext } from "../../Hooks/ThemeContext";
const Img =
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/furniture-product-ad-design-template-2c5f0dd5c6a4ac8e692646531729b55d_screen.jpg?ts=1599251678";
function Advertisement() {
  const mode = useSelector((state) => state.mode);
  const theme = useContext(ThemeContext);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="10px"
      padding="10px 20px"
      borderRadius="5px"
      backgroundColor={mode === "light" ? theme.light : theme.normalDark}
      boxShadow=" 0 0 .5rem rgba(0,0,0,.2)"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={{ color: mode === "light" ? theme.dark : theme.light }}>
          Sponsor
        </Typography>
        <Typography sx={{ color: "#ddd", fontSize: "10px" }}>
          Create Ad
        </Typography>
      </Box>
      <img
        width="100%"
        height="150px"
        style={{ objectFit: "cover", borderRadius: "10px" }}
        src={Img}
      />
      <Typography sx={{ color: "#ccc", fontSize: "10px", lineHeight: "1.5rem" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim nam
        facere ducimus magnam facilis aliquam animi possimus quibusdam incidunt
      </Typography>
    </Box>
  );
}

export default Advertisement;
