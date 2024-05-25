import { Calculator, OurAdvatages, OurWorks } from "@/widgets";
import { Box } from "@mui/material";
import React from "react";

export const WindowCalculator = () => {
  return (
    <Box>
      <Calculator />
      <OurAdvatages />
      <OurWorks />
    </Box>
  );
};
