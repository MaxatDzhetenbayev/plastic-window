import { GoogleLoginButton } from "@/features/auth";
import { auth } from "@/shared/api/firebaseConfig";
import { useAuth } from "@/shared/hooks/useAuth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignInForm = () => {
  const user = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (user) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/login",
        user,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => navigate("/"),
  });

  const handleNavigateForRole = (role) => {
    if (role === "admin") {
      return navigate("/admin");
    }
    if (role === "manager") {
      return navigate("/manager");
    }
    return navigate("/");
  };

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
          <Link to="/sign-up" style={{ color: "#1976d2", fontWeight: "600" }}>
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
          <TextField
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
          <Button
            variant="contained"
            onClick={() => mutate({ username, password })}
          >
            Войти
          </Button>
          <GoogleLoginButton />
        </Box>
        <Link style={{ color: "#1976d2", fontWeight: "500" }}>
          Забыли пароль?
        </Link>
      </Container>
    </Box>
  );
};
