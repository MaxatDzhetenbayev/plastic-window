// import { Modal } from "@components/index";
import { useAuth } from "@/shared/hooks/useAuth";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Modal,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const AdminRequest = () => {
  const user = useAuth();
  const [open, setOpen] = useState(false);
  const [currentEditRequest, setCurrentEditRequest] = useState(null);

  const [status, setStatus] = useState(null);
  const [newChange, setNewChange] = useState({});
  console.log(newChange);
  useEffect(() => {
    switch (user?.roles[0]) {
      case "admin":
        setStatus("all");
        break;
      case "manager":
        setStatus("all");
        break;
      case "worker":
        setStatus("work");
        break;
      default:
        setStatus("all");
    }
  }, [user]);

  const fetchRequests = async () => {
    const response = await axios.get(
      `http://localhost:3000/user-requests?status=${status}`,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  };
  console.log(currentEditRequest)
  const { data } = useQuery({
    queryFn: fetchRequests,
    queryKey: ["requests", status],
  });

  const handleOpen = (request) => {
    setCurrentEditRequest(request);
    setOpen(true);
  };

  return (
    <Box>
      <Box>
        {data?.map((request) => (
          <Paper key={request.id} sx={{ padding: "10px" }}>
            <Button onClick={() => handleOpen(request)}>Изменить</Button>
            <Box>
              <Typography>Заказ №{request.id}</Typography>

              <Typography>Клиент: {request.fullname}</Typography>
              <Typography>Телефон: {request.phone}</Typography>
              <Typography>
                Дата замера:
                {new Date(request.detail.measurement_date).toLocaleDateString()}
              </Typography>
              <Typography>Статус: {request.detail.status}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <TextField
            label="Полное имя"
            name="fullname"
            value={currentEditRequest?.fullname}
            onChange={(e) =>
              setCurrentEditRequest({ ...newChange, fullname: e.target.value })
            }
          />
          <TextField
            label="Телефон"
            name="phone"
            value={currentEditRequest?.phone}
            onChange={(e) =>
              setCurrentEditRequest({ ...newChange, phone: e.target.value })
            }
          />
          <TextField
            type="datetime-local"
            label="Дата замера"
            name="measurement_date"
            value={currentEditRequest?.detail.measurement_date}
            onChange={(e) =>
              setCurrentEditRequest({
                ...newChange,
                detail: {
                  ...newChange.detail,
                  measurement_date: e.target.value,
                },
              })
            }
          />
        </Box>
      </Modal>
    </Box>
  );
};
