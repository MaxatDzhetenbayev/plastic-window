import { Button, Typography } from "@mui/material";
import React from "react";
import { signInWithGoogle } from "../../api/auth";

export const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <Button
      sx={{ display: "flex", gap: "10px" }}
      variant="outlined"
      onClick={handleGoogleLogin}
    >
      <img
        style={{ maxHeight: "24px" }}
        src="https://img.icons8.com/color/48/000000/google-logo.png"
        alt="google-logo"
      />
      <Typography>Войти с помощью Google</Typography>
    </Button>
  );
};
