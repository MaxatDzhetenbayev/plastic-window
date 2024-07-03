import React from "react";
import { useLogout } from "../../api/auth";
import { Button } from "@mui/material";
export const LogoutButton = () => {
  const { mutate: logout } = useLogout();

  return (
    <Button variant="text" sx={{ color: "#ff0000" }} onClick={() => {}}>
      Выйти
    </Button>
  );
};
