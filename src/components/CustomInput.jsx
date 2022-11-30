import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const CustomInput = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.mainColor,
  },
  "& label": {
    color: theme.mainColor,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.mainColor,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.mainColor,
    },
    "&:hover fieldset": {
      borderColor: theme.mainColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.mainColor,
    },
  },
}));
