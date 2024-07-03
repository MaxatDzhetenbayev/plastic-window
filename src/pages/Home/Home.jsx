import { Hero, OurAdvatages, OurWorks, SubmitForm } from "@/widgets";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

export const Home = () => {
  const fetchWindows = async () => {
    const response = await axios.get("http://localhost:3000/windows", {
      withCredentials: true, // Это гарантирует, что cookies будут отправлены с запросом
    });
    return response.data;
  };

  useEffect(() => {
    fetchWindows();
  }, []);

  return (
    <Box>
      <Hero />
      <SubmitForm />
      <OurAdvatages />
      <OurWorks />
    </Box>
  );
};
