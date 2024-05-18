import { LogoutButton } from "@/features/auth";
import { useAuth } from "@/shared/hooks/useAuth";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
export const ProfileCard = () => {
  const user = useAuth();

  return (
    <Box>
      {user?.uid ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Добро пожаловать, {user?.displayName}</Typography>
          <LogoutButton />
          <Avatar src={user.photoURL} />
        </Box>
      ) : (
        <Box>
          <Link to="/sign-in">Войти</Link>
        </Box>
      )}
    </Box>
  );
};
