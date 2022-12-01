import React from 'react'

function FriendListSkeletom() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="10px"
    >
      {/* location */}
      <Box display="flex" alignItems="center" gap="10px">
        <RoomOutlinedIcon
          className="mui_icon"
          sx={{ color: mode === "light" ? theme.dark : theme.light }}
        />
        <Typography
          sx={{
            color: mode === "light" ? theme.dark : theme.light,
            fontSize: "16px",
          }}
        >
          {user?.location}
        </Typography>
      </Box>
      {/* work */}
      <Box display="flex" alignItems="center" gap="10px">
        <WorkIcon
          className="mui_icon"
          sx={{
            color: mode === "light" ? theme.dark : theme.light,
          }}
        />
        <Typography
          sx={{
            color: mode === "light" ? theme.dark : theme.light,
            fontSize: "16px",
          }}
        >
          {user?.occupation}
        </Typography>
      </Box>
    </Box>
  );
}

export default FriendListSkeletom