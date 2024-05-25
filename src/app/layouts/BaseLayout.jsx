import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@widgets";
import { Box } from "@mui/material";
import { getWindowModels } from "@/widgets/window-information/api/windowInformationApi";

export const BaseLayout = () => {
  const [windowModels, setWindowModels] = useState([]);

  useEffect(() => {
    getWindowModels().then((data) => {
      setWindowModels(data);
    });
  }, []);

  const navList = [
    {
      to: "/",
      title: "Главная",
    },
    {
      title: "Окна",
      children: windowModels.map(({ id, model: modelName }) => ({
        to: `/windows/${id}`,
        title: modelName,
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
