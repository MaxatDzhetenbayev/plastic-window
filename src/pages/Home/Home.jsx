import { useAuth } from "@/shared/hooks/useAuth";
import { Hero } from "@/widgets";
import { SubmitForm } from "@/widgets/submit-form/ui/SubmitForm";
import { Box } from "@mui/material";
import React from "react";

export const Home = () => {
  const user = useAuth();
  console.log(user?.uid);

  return (
    <Box>
      <Hero />
      <SubmitForm />
    </Box>
  );
};
