import { Box } from "@mui/material";
import React from "react";
import { WindowInformation } from "@widgets/window-information";
import { OurWorks } from "@/widgets";

export const Window = () => {
  return (
    <Box>
      <WindowInformation />
      <OurWorks />
    </Box>
  );
};
