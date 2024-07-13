import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@widgets";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";

export const BaseLayout = () => {
  const fetchWindows = async () => {
    const response = await api.get("windows");
    return response.data;
  };

  const { data: windows } = useQuery({
    queryKey: ["windows"],
    queryFn: fetchWindows,
  });

  const navList = [
    {
      to: "/",
      title: "Главная",
    },
    {
      title: "Окна",
      children: windows?.map((window) => ({
        to: `/windows/${window.id}`,
        title: window.name,
      })),
    },
    {
      to: "/calculator",
      title: "Калькулятор",
    },
  ];

  return (
    <Box>
      <Header navList={navList} />
      <Outlet />
    </Box>
  );
};
