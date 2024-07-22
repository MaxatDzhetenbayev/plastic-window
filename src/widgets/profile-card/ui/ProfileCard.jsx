import { UserAvatar } from "@/entities";
import { useAuth } from "@/shared/hooks/useAuth";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const ProfileCard = () => {
  const [user, success] = useAuth();

  return (
    <Box>
      {success ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Typography>
            Добро пожаловать, {user?.username || user?.email}
          </Typography>
          <UserAvatar avatarImage={user.image} />
        </Box>
      ) : (
        <Box>
          <Link to="/sign-in">Войти</Link>
        </Box>
      )}
    </Box>
  );
};
