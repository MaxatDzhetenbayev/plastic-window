import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const navList = [
  { to: "/", title: "Главная" },
  {
    title: "Окна",
    children: [
      { to: "/windows/plastic", title: "Пластиковые окна" },
      { to: "/windows/wooden", title: "Деревянные окна" },
      { to: "/windows/aluminum", title: "Алюминиевые окна" },
    ],
  },
];

const renderNavList = (list, handleToggle, openItems) => {
  return list.map(({ to, title, children }) => {
    const isOpen = openItems[title] || false;
    return (
      <Box key={title}>
        <ListItem
          onClick={() => {
            handleToggle(title);
          }}
        >
          <Link to={to}>{title}</Link>
          {children ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItem>
        {children && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map(({ to, title }) => (
                <ListItem key={title} component={Link} to={to}>
                  <ListItemText primary={title} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  });
};

export const DrawerNavbar = () => {
  const [open, setOpen] = useState(false);
  const [openItems, setOpenItems] = useState({});
  console.log(openItems);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleToggle = (title) => {
    setOpenItems((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={handleClose}>
        <List sx={{ minWidth: "190px" }}>
          {renderNavList(navList, handleToggle, openItems)}
        </List>
      </Drawer>
    </>
  );
};
