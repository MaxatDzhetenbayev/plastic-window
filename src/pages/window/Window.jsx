import { Box } from "@mui/material";
import React from "react";
import { WindowInformation } from "@widgets/window-information";
import { OurReviews, OurVideoReviews } from "@/widgets";

export const Window = () => {
  return (
    <Box>
      <WindowInformation />
      <OurReviews />
      <OurVideoReviews />
    </Box>
  );
};
