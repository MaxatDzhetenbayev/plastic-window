import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { sendUserSubmit } from "../api/sendUserSubmit";

export const SubmitForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const info = {
      name: formData.get("name"),
      phone: formData.get("phone"),
    };
    await sendUserSubmit(info);

    event.target.reset();
  };

  return (
    <Box>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px 0",
          gap: "20px",
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          sx={{ color: "#1976d2", textAlign: "center" }}
        >
          Оставьте заявку, чтобы с вами связался наш менеджер!
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "20px" }}>
          <TextField
            required
            variant="outlined"
            name="name"
            placeholder="Ваше имя"
          />
          <TextField
            required
            variant="outlined"
            name="phone"
            placeholder="Ваш номер телефона"
          />
          <Button type="submit">Оставть заявку</Button>
        </form>
      </Container>
    </Box>
  );
};
