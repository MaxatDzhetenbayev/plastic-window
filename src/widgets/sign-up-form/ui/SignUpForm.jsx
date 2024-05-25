import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { fetchCreateAccount } from "../api/SignUpFormApi";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccaunt = async (email, password) => {
    await fetchCreateAccount(email, password);
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
            onClick={() => handleCreateAccaunt(email, password)}
            variant="contained"
          >
            Зарегестрироваться
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
