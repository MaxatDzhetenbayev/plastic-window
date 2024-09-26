import {
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/shared/api";
import { Modal } from "@/shared/components";
import { UploadButton } from "@/features/upload-button/ui/UploadButton";
import { Controller, useForm } from "react-hook-form";

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
        return "Оплачен";
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
    const { register, handleSubmit, control } = useForm({
      defaultValues: {
        rating: 0,
      },
    });
    const { data: user_view } = useQuery({
      queryKey: ["user-reviews"],
      queryFn: async () => {
        if (!orderItem.detail.id) return [];
        const response = await api.get(
          `/user-reviews/find-by-request/${orderItem.detail.id}`,
          {
            withCredentials: true,
          }
        );
        return response.data;
      },
    });

    const { mutate } = useMutation({
      mutationFn: async (data) => {
        const response = await api.post(`user-reviews`, data, {
          withCredentials: true,
        });
        return response.data;
      },
    });

    const handleCreateReview = async (data, worker_id, user_request_id) => {
      mutate({ ...data, worker_id, user_request_id });
    };


    if (!orderItem.detail) return null;

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
                {orderItem.detail.status === "done" && !user_view?.length && (
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
          <Typography variant="h6" fontWeight="600" textAlign="center">
            Оставить отзыв
          </Typography>
          <Box sx={{ mt: "10px" }}>
            <form
              onSubmit={handleSubmit((data) =>
                handleCreateReview(
                  data,
                  orderItem.detail.worker_id,
                  orderItem.detail.id
                )
              )}
            >
              <Typography variant="h6" fontWeight="600">
                Оценка:
              </Typography>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => <Rating {...field} />}
              />
              <TextField
                sx={{ mt: "10px" }}
                {...register("review", { required: true })}
                variant="standard"
                helperText="Ваш комментарий"
                fullWidth
              />
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange } }) => (
                  <UploadButton onUploadComplete={(url) => onChange(url)}>
                    Загрузить картинку
                  </UploadButton>
                )}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ width: "100%", mt: "20px" }}
              >
                Отправить
              </Button>
            </form>
          </Box>
        </Modal>
      </>
    );
  };

  const { data: userProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await api.get(`profile/find/by-user`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      name: " ",
      surname: " ",
    }
  });

  useEffect(() => {
    reset(userProfile);
  }, [userProfile]);

  const { mutate: userProfileUpdate } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await api.patch(`profile/${userProfile.id}`, data, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.log("Error detail: " + error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("user-profile");
    }
  })

  return (
    <Box>
      <Container>
        <Box>
          <Typography variant="h4" sx={{ marginTop: "50px" }}>
            Личный кабинет
          </Typography>
          <Box>
            <Typography variant="h6" fontWeight="600">
              Ваши данные
            </Typography>
            <form onSubmit={handleSubmit((data) => userProfileUpdate(data))}>
              <TextField
                {...register("name")}
                label="Имя"
                fullWidth
                sx={{ marginTop: "20px" }}
              />
              <TextField
                {...register("surname")}
                label="Фамилия"
                fullWidth
                sx={{ marginTop: "20px" }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ width: "100%", mt: "20px" }}
              >
                Сохранить
              </Button>
            </form>
          </Box>
          <Box
            sx={{
              marginTop: "20px",
            }}
          >
            <Typography variant="h6" fontWeight="600">
              Ваши заказы
            </Typography>
            {isLoading ? (
              <Typography>Загрузка...</Typography>
            ) : (
              <Table>
                <TableHead>
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
