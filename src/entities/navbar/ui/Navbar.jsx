import React, { useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";

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

export const Navbar = ({ navList }) => {
  return <Box sx={{ display: "flex" }}>{renderNavList(navList)}</Box>;
};
