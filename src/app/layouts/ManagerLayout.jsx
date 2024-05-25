import { Header } from "@/widgets";
import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export const ManagerLayout = () => {
  const navList = [
    {
      to: "/manager",
      title: "Заявки",
    },
  ];

  return (
    <Box>
      <Header navList={navList} />
      <Outlet />
    </Box>
  );
};
