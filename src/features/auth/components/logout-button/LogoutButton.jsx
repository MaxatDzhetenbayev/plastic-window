import React from "react";
import { logout } from "../../api/auth";
import { Button, Typography } from "@mui/material";
export const LogoutButton = () => {
  return (
    <Button variant="text" sx={{ color: "#ff0000" }} onClick={logout}>
      Выйти
    </Button>
  );
};
