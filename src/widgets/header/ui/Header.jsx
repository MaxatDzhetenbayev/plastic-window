import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Logo } from "@components";
import { Navbar, DrawerNavbar } from "@entities";
import { ProfileCard } from "@widgets/profile-card";

export const Header = ({ navList }) => {
  const theme = useTheme();
  const isModile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      <Toolbar>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo />
          {isModile ? (
            <DrawerNavbar navList={navList} />
          ) : (
            <>
              <Navbar navList={navList} />
              <ProfileCard />
            </>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};
