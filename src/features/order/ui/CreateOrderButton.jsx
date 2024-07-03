import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Modal } from "@components/index";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

export const CreateOrderButton = ({ itemId }) => {
  const [open, setOpen] = useState(false);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [measurementDate, setMeasurementDate] = useState(null);

  console.log(measurementDate);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchCreateRequest = async () => {
    const response = await axios.post(
      `http://localhost:3000/user-requests`,
      {
        fullname,
        phone,
        address,
        detail: {
          measurement_date: measurementDate,
          item_id: itemId,
          options: {},
        },
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchCreateRequest();
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
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <TextField
                label="Телефон"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Адрес проживания"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Дата замера"
                  value={measurementDate}
                  onChange={(newValue) => setMeasurementDate(newValue)}
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
