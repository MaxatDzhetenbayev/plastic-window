import { Hero, OurAdvatages, OurWorks, SubmitForm } from "@/widgets";
import { Box} from "@mui/material";
import React from "react";

export const Home = () => {


  return (
    <Box>
      <Hero />
      <SubmitForm />
      <OurAdvatages />
      <OurWorks/>
    </Box>
  );
};
