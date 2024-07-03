import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Modal } from "@components/index";
import { useAuth } from "@/shared/hooks/useAuth";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const CreateOrderButton = ({ windowId }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   const fetchCreateOrder = async (userId, windowId, name, phone) => {
  //     try {
  //       const userDoc = doc(db, "users", userId);

  //       const ordersCollectionRef = collection(userDoc, "orders");

  //       const data = {
  //         userId,
  //         window: windowId,
  //         status: "new",
  //         options: null,
  //         name,
  //         phone,
  //       };

  //       await addDoc(ordersCollectionRef, data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    //  fetchCreateOrder(userId, windowId, name, phone);
  };

  return (
    <>
      <Button onClick={handleOpen} sx={{ mt: "10px" }} variant="outlined">
        Заказать
      </Button>
      <Modal open={open} handleClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" textAlign="center">
              Заказать услугу
            </Typography>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <TextField
                label="Полное имя"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Телефон"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Адрес доставки"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Дата замера"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                />
              </LocalizationProvider>
              <Button variant="contained" type="submit">
                Заказать
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
