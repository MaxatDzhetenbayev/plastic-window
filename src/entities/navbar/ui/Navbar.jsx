import React, { useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";

const navList = [
  {
    to: "/",
    title: "Главная",
  },
  {
    title: "Окна",
    children: [
      {
        to: "/windows/plastic",
        title: "Пластиковые окна",
      },
      {
        to: "/windows/wooden",
        title: "Деревянные окна",
      },
      {
        to: "/windows/aluminum",
        title: "Алюминиевые окна",
      },
    ],
  },
];

const renderNavList = (list) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return list.map(({ to, title, children }) => {
    return (
      <Box key={title}>
        <Button
          onClick={children ? (event) => handleOpenMenu(event) : null}
          endIcon={children ? <KeyboardArrowDown /> : null}
          sx={{ color: "white" }}
        >
          <Link to={!children ? to : "#"}>{title}</Link>
        </Button>
        {children && (
          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
            {children.map(({ to, title }) => (
              <MenuItem
                key={title}
                component={Link}
                to={to}
                onClick={handleCloseMenu}
              >
                {title}
              </MenuItem>
            ))}
          </Menu>
        )}
      </Box>
    );
  });
};

export const Navbar = () => {
  return <Box sx={{ display: "flex" }}>{renderNavList(navList)}</Box>;
};
