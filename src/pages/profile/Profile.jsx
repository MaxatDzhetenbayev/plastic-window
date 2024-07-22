import {
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/shared/api";
import { Modal } from "@/shared/components";
import { UploadButton } from "@/features/upload-button/ui/UploadButton";

export const Profile = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const response = await api.get(`user-requests/user`, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.log("Error detail: " + error);
        return [];
      }
    },
    queryKey: ["requests"],
  });

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return "В обработке";
      case "preparing":
        return "Ожидание оплаты";
      case "paid":
        return "Оплачен"
      case "work":
        return "В работе";
      case "done":
        return "Завершен";
      default:
        return "В обработке";
    }
  };

  const CustumRow = ({ orderItem }) => {
    const [open, setOpen] = useState(false);
    const [reviewIsOpen, setReviewIsOpen] = useState(false);
    const [text, setText] = useState("");
    const [imageUrl, setImageUrl] = useState(null);

    console.log(imageUrl)

    const navigate = useNavigate();
    return (
      <>
        <TableRow>
          <TableCell>
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell>{orderItem.id}</TableCell>
          <TableCell>
            {new Date(orderItem.createdAt).toLocaleDateString()}
          </TableCell>
          <TableCell>{renderStatus(orderItem.detail.status)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open}>
              <Box sx={{ padding: "20px" }}>
                <Typography variant="h6" fontWeight="600" textAlign="center">
                  Детали заказа
                </Typography>
                <Typography>
                  <strong>Название товара:</strong> {orderItem.detail.item.name}
                </Typography>
                <Typography>
                  <strong>Дата замера:</strong>{" "}
                  {new Date(
                    orderItem.detail.measurement_date
                  ).toLocaleDateString()}
                </Typography>
                <Typography>
                  <strong>Дата установки:</strong>{" "}
                  {orderItem.detail.instalation_date
                    ? new Date(
                      orderItem.detail.instalation_date
                    ).toLocaleDateString()
                    : "Не назначена"}
                </Typography>
                <Typography>
                  <strong>Ширина:</strong>{" "}
                  {orderItem.detail.options.width
                    ? orderItem.detail.options.width
                    : "Указание после замера"}
                </Typography>
                <Typography>
                  <strong>Высота:</strong>{" "}
                  {orderItem.detail.options.height
                    ? orderItem.detail.options.height
                    : "Указание после замера"}
                </Typography>
                {orderItem.detail.status === "preparing" && (
                  <Button
                    variant="contained"
                    sx={{ width: "100%", mt: "20px" }}
                    onClick={() => navigate(`/payment/${orderItem.id}`)}
                  >
                    Оплатить
                  </Button>
                )}
                {orderItem.detail.status === "done" && (
                  <Button
                    variant="contained"
                    sx={{ width: "100%", mt: "20px" }}
                    onClick={() => setReviewIsOpen(true)}
                  >
                    Оставить отзыв
                  </Button>
                )}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        <Modal open={reviewIsOpen} handleClose={() => setOpen(false)}>
          <Box sx={{ padding: "20px", display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}>
            <Box sx={{ backgroundColor: "#fff", padding: "20px", display: "flex", flexDirection: "column", gap: "20px", borderRadius: "10px" }}>
              <Typography variant="h6" fontWeight="600" textAlign="center">
                Оставить отзыв
              </Typography>
              <TextField onChange={(e) => setText(e.target.value)} value={text} variant="standard" helperText="Ваш комментарий" fullWidth />
              <UploadButton onUploadComplete={(url) => setImageUrl(url)}>
                Загрузить картину
              </UploadButton>
              <Button
                variant="contained"
                sx={{ width: "100%", mt: "20px" }}
                onClick={() => {
                  setReviewIsOpen(false);
                }}
              >
                Отправить
              </Button>
            </Box>
          </Box>
        </Modal>
      </>
    );
  };

  return (
    <Box>
      <Container>
        <Box>
          <Typography variant="h4" sx={{ marginTop: "50px" }}>
            Личный кабинет
          </Typography>
          <Box
            sx={{
              borderRadius: "2px",
              border: `1px solid #dddddd`,
              marginTop: "20px",
            }}
          >
            {isLoading ? (
              <Typography>Загрузка...</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Мои заказы</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell>ID Заказа</TableCell>
                    <TableCell>Дата</TableCell>
                    <TableCell>Статус</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((order) => (
                    <CustumRow key={order.id} orderItem={order} />
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
