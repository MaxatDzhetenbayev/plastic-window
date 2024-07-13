import { logoutRequest } from "@/features/auth/api/auth";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const UserAvatar = ({ avatarImage }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const menuList = [
    {
      to: "/profile",
      title: "Profile",
    },
    {
      title: "Logout",
      callback: logoutRequest,
    },
  ];

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar
        sx={{ cursor: "pointer" }}
        onClick={(event) => handleOpenMenu(event)}
        src={avatarImage}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuList.map(({ to, title, callback }) => (
          <MenuItem key={title} onClick={handleClose}>
            {to ? (
              <Link to={to}>{title}</Link>
            ) : (
              <Typography onClick={callback}>{title}</Typography>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
