import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Divider,
  useMediaQuery,
  Button,
  InputBase,
} from "@mui/material";
import DropZone from "react-dropzone";
//icons
import EditIcon from "@mui/icons-material/Edit";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ImageIcon from "@mui/icons-material/Image";
//components
import UserImg from "../../components/UserImg";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../redux/index";
//context
import { ThemeContext } from "../../Hooks/ThemeContext";

function MyPostWidget({ picturePath }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [chooseImage, setChooseImage] = useState(false);
  const [image, setImage] = useState(null);
  const isNonMobileScreen = useMediaQuery("(min-width:990px)");
  const mode = useSelector((state) => state.mode);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const theme = useContext(ThemeContext);

  //handle publish a post
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", description);
    if (chooseImage) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    //send request to get all post
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/posts/create`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    const posts = await response.json();
    //dispatch posts
    dispatch(setPosts({ posts }));
    setImage(null);
    setDescription("");
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      // alignItems="center"
      gap="20px"
      padding="10px"
      backgroundColor={mode === "light" ? theme.light : theme.normalDark}
      borderRadius="10px"
      boxShadow="0 0 .5rem 0 rgba(0,0,0,.2)"
    >
      {/* image and input post */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="20px"
      >
        <UserImg image={picturePath} />
        <InputBase
          placeholder="What's your idea...?"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          sx={{
            width: "100%",
            borderRadius: "10px",
            backgroundColor: mode === "dark" ? "#333" : "",
            paddingLeft: "15px",
            border: mode === "light" && "1px solid #ccc",
          }}
        />
      </Box>
      {chooseImage && (
        // img box
        <Box
          border={`1px solid ${theme.mainColor}`}
          borderRadius="5px"
          sx={{ width: "100%" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* dropzone */}
          <DropZone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input {...getInputProps()} />
                {!image ? (
                  <AddAPhotoIcon sx={{ color: theme.mainColor }} />
                ) : (
                  <Box
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="20px"
                  >
                    <Typography
                      sx={{
                        color: mode === "light" ? theme.dark : theme.light,
                        overFlow: "hidden",
                      }}
                    >
                      {image.name}
                    </Typography>
                    <EditIcon sx={{ color: theme.mainColor }} />
                    <DeleteIcon
                      sx={{ color: theme.mainColor }}
                      onClick={() => setImage(null)}
                    />
                  </Box>
                )}
              </Box>
            )}
          </DropZone>
          {/* end ofdropzone */}
        </Box>
      )}
      <Divider />
      {/* share icons  */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap="20px">
          <ImageIcon
            className="mui_icon"
            sx={{ color: "#ccc" }}
            onClick={() => setChooseImage(!chooseImage)}
          />
          <Typography sx={{ color: "#ccc" }}>Image</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="20px">
          <AttachmentIcon
            className="mui_icon"
            sx={{ color: "#ccc" }}
            onClick={() => setChooseImage(!chooseImage)}
          />
          <Typography sx={{ color: "#ccc" }}>AttachFile</Typography>
        </Box>
        <Button
          disabled={!description}
          onClick={handlePost}
          sx={{
            color: "white",
            backgroundColor: theme.mainColor,
            borderRadius: "10px",
            height: "30px",
            cursor: "pointer",
          }}
        >
          POST
        </Button>
      </Box>
    </Box>
  );
}

export default MyPostWidget;
