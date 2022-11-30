import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function BadgeAvatars() {
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar
        alt="Remy Sharp"
        src="https://scontent.fcai20-6.fna.fbcdn.net/v/t1.6435-9/129248820_763369290913786_3738638183660161962_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=zJ-0wd53A5cAX9rTHzc&_nc_ht=scontent.fcai20-6.fna&oh=00_AfDCUA9Ej829l0VgpN6KkEUez0WAmdkMk5iJOpyP-TUEEw&oe=63ADB86Dhttps://scontent.fcai20-6.fna.fbcdn.net/v/t1.6435-9/129248820_763369290913786_3738638183660161962_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=zJ-0wd53A5cAX9rTHzc&_nc_ht=scontent.fcai20-6.fna&oh=00_AfDCUA9Ej829l0VgpN6KkEUez0WAmdkMk5iJOpyP-TUEEw&oe=63ADB86D"
      />
    </StyledBadge>
  );
}
