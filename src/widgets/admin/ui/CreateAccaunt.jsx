import { fetchCreateAccount } from "@/widgets/api/CreateAccaount";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const roleList = ["manager", "worker"];

export const CreateAccaunt = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roleList[0]);

  return (
    <Container>
      <form sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          placeholder="Введите email пользователя"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="Введите пароль пользователя"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          {roleList.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={() => fetchCreateAccount(email, password, role)}>
          Создать аккаунт
        </Button>
      </form>
    </Container>
  );
};
