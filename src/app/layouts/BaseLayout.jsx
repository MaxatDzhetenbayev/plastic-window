import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@widgets";
import { Box, Container } from "@mui/material";

export const BaseLayout = () => {
  return (
    <Box>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
};
