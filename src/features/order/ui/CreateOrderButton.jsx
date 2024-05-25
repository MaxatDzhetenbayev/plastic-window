import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Modal } from "@components/index";
import { useAuth } from "@/shared/hooks/useAuth";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/shared/api/firebaseConfig";

export const CreateOrderButton = ({ windowId }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const user = useAuth();
  const userId = user?.uid;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchCreateOrder = async (userId, windowId, name, phone) => {
    try {
      const userDoc = doc(db, "users", userId);

      const ordersCollectionRef = collection(userDoc, "orders");

      const data = {
        userId,
        window: windowId,
        status: "new",
        options: null,
        name,
        phone,
      };

      await addDoc(ordersCollectionRef, data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    fetchCreateOrder(userId, windowId, name, phone);
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
                label="Имя"
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
