import {
  Box,
  Button,
  Container,
  Divider,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const windowList = [
  [
    {
      id: 1,
      price: 32198,
      img: "./images/window-calculator/1_1.png",
      options: {
        minHeight: 65,
        maxHeight: 220,
        minWidth: 40,
        maxWidth: 125,
      },
    },
    {
      id: 2,
      price: 62149,
      img: "./images/window-calculator/1_2.png",
      options: {
        minHeight: 65,
        maxHeight: 220,
        minWidth: 40,
        maxWidth: 125,
      },
    },
    {
      id: 3,
      price: 67392,
      img: "./images/window-calculator/1_3.png",
      options: {
        minHeight: 65,
        maxHeight: 220,
        minWidth: 40,
        maxWidth: 125,
      },
    },
  ],
  [
    {
      id: 1,
      price: 32198,
      img: "./images/window-calculator/2_1.png",
      options: {
        minHeight: 65,
        maxHeight: 220,
        minWidth: 40,
        maxWidth: 125,
      },
    },
    {
      id: 2,
      price: 62149,
      img: "./images/window-calculator/2_2.png",
      options: {
        minHeight: 65,
        maxHeight: 220,
        minWidth: 40,
        maxWidth: 125,
      },
    },
    {
      id: 3,
      price: 67392,
      img: "./images/window-calculator/2_3.png",
      options: {
        minHeight: 65,
        maxHeight: 220,
        minWidth: 40,
        maxWidth: 125,
      },
    },
  ],
];

const WindowItems = ({ windows, handleSetCurrentWindow }) => {
  const [currentItemWindow, setCurrentItemWindow] = useState(windows[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (window) => {
    setCurrentItemWindow(window);
    handleSetCurrentWindow(window);
  };

  return (
    <Box
      sx={{ height: "100px", position: "relative" }}
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <img src={currentItemWindow.img} style={{ height: "100%" }} />
      <Box
        sx={{
          position: "fixed",
          display: isMenuOpen ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        {windows
          .filter((item) => item.id != currentItemWindow.id)
          .map((window) => (
            <img
              key={window.id}
              onClick={() => handleClick(window)}
              src={window.img}
              alt="window"
              style={{ height: "100px" }}
            />
          ))}
      </Box>
    </Box>
  );
};

export const Calculator = () => {
  const [windowOptions, setWindowOptions] = useState({
    height: 100,
    width: 100,
  });
  const [currentWindow, setCurrentWindow] = useState(windowList[0][0]);

  const handleCalculate = (height, width) => {
    const calcHeight = height / 100;
    const calcWidth = width / 100;

    return Math.ceil(calcHeight * calcWidth * currentWindow.price);
  };

  return (
    <Box>
      <Box sx={{ backgroundColor: "#353535", color: "#fff" }}>
        <Container sx={{ display: "flex" }}>
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#E9E9E9",
              color: "#000",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box flex={1}>
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Размер окна:
              </Typography>
              <Box
                sx={{
                  marginTop: "30px",
                }}
              >
                <TextField
                  label="Высота, см"
                  type="number"
                  value={windowOptions.height}
                  onChange={(e) =>
                    setWindowOptions({
                      ...windowOptions,
                      height: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Ширина, см"
                  type="number"
                  value={windowOptions.width}
                  onChange={(e) =>
                    setWindowOptions({
                      ...windowOptions,
                      width: e.target.value,
                    })
                  }
                />
              </Box>
            </Box>
            <Divider sx={{ margin: "20px 0px" }} />
            <Box sx={{ flex: "2", display: "flex" }}>
              <Box
                sx={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <Typography>Итоговая стоимость:</Typography>
                <Box>
                  <Typography variant="h4">
                    {handleCalculate(windowOptions.height, windowOptions.width)}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ flex: 1 }}>
                окно в комплекте панельный дом: Откос Подоконник Слив Москитная
                сетка
              </Typography>
            </Box>
            <Divider sx={{ margin: "20px 0px" }} />
            <Box flex={1} sx={{ display: "flex" }}>
              <Button sx={{ width: "100%" }} variant="contained">
                <Typography variant="h4">Заказать звонок</Typography>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              color: "#fff",
              flex: 1,
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", gap: "20px" }}>
              {windowList.map((windows) => (
                <WindowItems
                  windows={windows}
                  handleSetCurrentWindow={setCurrentWindow}
                />
              ))}
            </Box>
            <Divider
              sx={{
                backgroundColor: "#fff",
                padding: "1px",
                margin: "30px 0px",
              }}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "50px 2fr",
                gridTemplateRows: "2fr 50px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gridArea: "1 / 2 / 2 / 3",
                  justifyContent: "center",
                  padding: "30px",
                }}
              >
                <img src={currentWindow.img} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Slider
                  sx={{
                    gridArea: "1 / 1 / 2 / 2",
                  }}
                  orientation="vertical"
                  value={windowOptions.height}
                  valueLabelDisplay="auto"
                  onChange={(e) =>
                    setWindowOptions({
                      ...windowOptions,
                      height: e.target.value,
                    })
                  }
                  min={currentWindow.options.minHeight}
                  max={currentWindow.options.maxHeight}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "50px",
                  gridArea: "2 / 2 / 2 / 3",
                }}
              >
                <Slider
                  value={windowOptions.width}
                  onChange={(e) =>
                    setWindowOptions({
                      ...windowOptions,
                      width: e.target.value,
                    })
                  }
                  valueLabelDisplay="auto"
                  min={currentWindow.options.minWidth}
                  max={currentWindow.options.maxWidth}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
