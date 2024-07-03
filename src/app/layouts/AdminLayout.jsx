import { useAuth } from "@/shared/hooks/useAuth";
import { Box, Typography } from "@mui/material";
import React, {  useLayoutEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AdminLayout = () => {
  const user = useAuth();
  console.log(user)

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  useLayoutEffect(() => {
   
  }, [ navigate]);

  // if (loading) return <Typography>Загрузка...</Typography>;

  return (
    <Box>
      <Outlet />
    </Box>
  );
};
