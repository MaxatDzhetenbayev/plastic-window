import {
  Calculator,
  OurAdvatages,
  OurReviews,
  OurVideoReviews,
} from "@/widgets";
import { Box } from "@mui/material";
import React from "react";

export const WindowCalculator = () => {
  return (
    <Box>
      <Calculator />
      <OurAdvatages />
      <OurReviews />
      <OurVideoReviews />
    </Box>
  );
};
