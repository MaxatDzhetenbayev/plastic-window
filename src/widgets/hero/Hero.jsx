import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)",
        objectFit: "cover",
        backgroundImage: "url('/images/hero-image.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0,0,0, 0.4)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: "#fff",
              textAlign: "right",
              fontWeight: "600",
              fontSize: "clamp(1.4rem, 4vw, 3rem)",
            }}
          >
            Пластиковые окна в Семее <br />
            напрямую от производителя <br />
            <Typography
              variant="h3"
              sx={{
                fontWeight: "600",
                color: "#fff",
                fontSize: "1em",
              }}
            >
              с гарантией 10 лет!
            </Typography>
          </Typography>
          <Link
            to="calculator"
            style={{
              color: "#fff",
              backgroundColor: "#1976d2",
              padding: "10px 15px",
              borderRadius: "7px",
              marginTop: "20px",
              fontSize: "clamp(13px, 4vw, 20px)",
            }}
          >
            Самостоятельный рассчет Вашего окна
          </Link>
        </Container>
      </Box>
    </Box>
  );
};
