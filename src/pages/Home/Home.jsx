import { useAuth } from "@/shared/hooks/useAuth";
import { Hero, OurAdvatages, SubmitForm } from "@/widgets";
import { Box } from "@mui/material";
import React from "react";

export const Home = () => {
  const user = useAuth();
  console.log(user?.uid);

  return (
    <Box>
      <Hero />
      <SubmitForm />
      <OurAdvatages />
    </Box>
  );
};
