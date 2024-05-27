import { GoogleLoginButton } from "@/features/auth";
import { auth } from "@/shared/api/firebaseConfig";
import { useAuth } from "@/shared/hooks/useAuth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignInForm = () => {
  const user = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const fetchSignIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    return navigate("/");
  };

  const handleNavigateForRole = (role) => {
    if (role === "admin") {
      return navigate("/admin");
    }
    if (role === "manager") {
      return navigate("/manager");
    }
    return navigate("/");
  };

  const handleSignIn = async (email, password) => {
    try {
      await fetchSignIn(email, password);

      handleNavigateForRole(user.role);
    } catch (error) {
      console.log(error);
    }
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
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={() => handleSignIn(email, password)}
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
