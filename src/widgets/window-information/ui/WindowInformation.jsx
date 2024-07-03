import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CreateOrderButton } from "@/features/order";

export const WindowInformation = () => {
  const { model } = useParams();
const [currentTabId, setCurrentTabId] = useState(null)
  const fetchWindows = async () => {
    const response = await axios.get(`http://localhost:3000/windows/${model}`);
    console.log(response.data)
    return response.data;
  };

  const { data: window, isLoading } = useQuery({
    queryKey: ["window", model],
    queryFn: fetchWindows,
  });

  const [itemInfo, setItemInfo] = useState(null);


  useEffect(() => {
    setItemInfo(window?.items[0]);
    setCurrentTabId(window?.items[0].id)
  }, [window]);
  const handleItemInfo = (id) => {
    setCurrentTabId(id)
    setItemInfo(window?.items.find((item) => item.id === id));
  };


  return (
    <Container>
      <Typography variant="h2" sx={{ textAlign: "center", marginTop: "30px" }}>
        {String(`Пластиковые окна`).toLocaleUpperCase()}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {/* {windowModels.map(({ id, model: modelName }) => (
          <Button
            key={id}
            variant="contained"
            color={model === id ? "primary" : "inherit"}
            onClick={() => handleModelChoice(id)}
          >
            {modelName}
          </Button>
        ))} */}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {window?.items.map(({ id, name }) => (
          <Button
            key={id}
            variant="outlined"
            color={ currentTabId === id ?  "secondary": "primary"}

            onClick={() => handleItemInfo(id)}
          >
            {name}
          </Button>
        ))}
      </Box>
      {isLoading ? (
        <Typography>Загрузка...</Typography>
      ) : itemInfo ? (
        <>
          <Box sx={{ marginTop: "50px" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "600", textAlign: "center" }}
            >
              {itemInfo.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <img
                  src={itemInfo.image}
                  alt=""
                  style={{ width: "200px", aspectRatio: 1 / 1.3 }}
                />
                <Box>
                  <Typography>Характиристики профиля</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>Теплоизоляция</Typography>
                    <Box sx={{ display: "flex", gap: "3px" }}>
                      {Array.from({ length: 18 })
                        .fill(" ")
                        .map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              height: "20px",
                              width: "8px",
                              backgroundColor: () =>
                                index < itemInfo.characteristics.thermal
                                  ? "red"
                                  : "grey",
                            }}
                          ></Box>
                        ))}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>Шумоизоляция</Typography>
                    <Box sx={{ display: "flex", gap: "3px" }}>
                      {Array.from({ length: 18 })
                        .fill(" ")
                        .map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              height: "20px",
                              width: "8px",
                              backgroundColor: () =>
                                index < itemInfo.characteristics.noise
                                  ? "red"
                                  : "grey",
                            }}
                          ></Box>
                        ))}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>Дизайн</Typography>
                    <Box sx={{ display: "flex", gap: "3px" }}>
                      {Array.from({ length: 18 })
                        .fill(" ")
                        .map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              height: "20px",
                              width: "8px",
                              backgroundColor: () =>
                                index < itemInfo.characteristics.design
                                  ? "red"
                                  : "grey",
                            }}
                          ></Box>
                        ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flex: 2, display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                  {itemInfo.features?.map(({ id, description, title }) => (
                    <Box
                      key={id}
                      sx={{
                        flexBasis: "300px",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="contained" color="primary">
                        {title}
                      </Typography>
                      <Typography variant="contained">{description}</Typography>
                    </Box>
                  ))}
                </Box>
                <Typography sx={{ mt: "30px" }}>
                  Цена: {Number(itemInfo.price).toLocaleString()}тг.
                </Typography>
                <CreateOrderButton itemId={currentTabId} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "50px" }}>
            <Typography sx={{ textAlign: "justify" }}>
              {window.description}
            </Typography>
          </Box>
        </>
      ) : (
        <Typography>Нет информаций</Typography>
      )}
    </Container>
  );
};
