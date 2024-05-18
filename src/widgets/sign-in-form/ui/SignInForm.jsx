import { GoogleLoginButton } from "@/features/auth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const SignInForm = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 64px)",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3">Авторизация</Typography>
        <Typography variant="body1">
          или{" "}
          <Link style={{ color: "#1976d2", fontWeight: "600" }}>
            Создать новый аккаунт
          </Link>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <TextField placeholder="Email" />
          <TextField placeholder="Password" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "40px",
            marginBottom: "20px",
          }}
        >
          <Button variant="contained">Войти</Button>
          <GoogleLoginButton />
        </Box>
        <Link style={{ color: "#1976d2", fontWeight: "500" }}>
          Забыли пароль?
        </Link>
      </Container>
    </Box>
  );
};
