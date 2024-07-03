import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registrationUser = async (user) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/register",
        user
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: registrationUser,
    onSuccess: () => navigate("/sign-in"),
  });

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 64px)",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3">Регистрация</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="User Name"
          />
          <TextField
            type="password" // Убедись, что пароль скрыт
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
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
            onClick={() => mutate({ email, password, username })}
            variant="contained"
          >
            Зарегистрироваться
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
