import {
  Box,
  Button,
  Rating,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Modal } from "@components/index";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { api } from "@/shared/api";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateOrderButton = ({ itemId }) => {
  const [open, setOpen] = useState(false);
  const [workerId, setWorkerId] = useState(null);
  console.log(itemId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const handleOpen = () => {
    setOpen(true);
  };
  console.log(workerId);

  const handleClose = () => {
    setOpen(false);
  };

  const { data: workers } = useQuery({
    queryKey: ["workers"],
    queryFn: async () => {
      const response = await api.get("/users/workers", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const fetchCreateRequest = async (data) => {
    const response = await api.post(`user-requests`, data, {
      withCredentials: true,
    });
    return response.data;
  };

  const { data: workerBusyTimes } = useQuery({
    queryKey: ["worker-busy-times", workerId],
    queryFn: async () => {
      const response = await api.get(
        `user-requests/workers/${workerId}/busy-times`
      );

      return response.data;
    },
    enabled: !!workerId,
  });

  const isTimeBlocked = (time) => {
    if (!time || !workerBusyTimes) return false;
    const currentDate = dayjs(time).format("YYYY-MM-DD");
    const currentHour = time.$H;

    const blockedDate = workerBusyTimes.find((item) => {
      const instalationDate = dayjs(item.detail.instalation_date).format(
        "YYYY-MM-DD"
      );
      return instalationDate === currentDate;
    });

    return blockedDate
      ? dayjs(blockedDate.detail.instalation_date).hour() === currentHour
      : false;
  };

  const { mutate } = useMutation({
    mutationFn: fetchCreateRequest,
    onSettled: () => {
      handleClose();
    },
  });

  const handleCreateRequest = async (data) => {
    const worker = workers.find((worker) => worker.id == data.worker);
    const requestData = {
      ...data,
      worker: worker,
      detail: {
        measurement_date: data.measurement_date.$d,
        item_id: itemId,
        options: {},
      },
    };
    console.log(requestData);
    mutate(requestData);
  };

  return (
    <>
      <Button onClick={handleOpen} sx={{ mt: "10px" }} variant="outlined">
        Заказать
      </Button>
      <Modal open={open} handleClose={handleClose}>
        <Typography variant="h3" textAlign="center">
          Заказать услугу
        </Typography>
        <form
          onSubmit={handleSubmit(handleCreateRequest)}
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
            {...register("fullname", { required: true })}
          />
          <TextField
            label="Телефон"
            variant="outlined"
            {...register("phone", { required: true })}
          />
          <TextField
            label="Почта"
            variant="outlined"
            {...register("email", { required: true })}
          />
          <TextField
            label="Адрес проживания"
            variant="outlined"
            {...register("address", { required: true })}
          />
          <Typography variant="h5">Выберите специалиста:</Typography>
          <Controller
            name="worker"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <ToggleButtonGroup
                color="primary"
                exclusive
                {...field}
                aria-label="Platform"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  maxHeight: "150px",
                  overflowY: "scroll",
                }}
              >
                {workers?.map((worker) => {
                  return (
                    <>
                      <ToggleButton
                        key={worker.id}
                        value={worker.id}
                        onClick={() => setWorkerId(worker.id)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          bgcolor:
                            field.value == worker.id
                              ? "primary.main"
                              : "default",
                          color: field.value == worker.id ? "white" : "black",
                          "&:hover": {
                            bgcolor:
                              field.value == worker.id
                                ? "primary.dark"
                                : "grey.300", // Изменение цвета при наведении
                          },
                        }}
                      >
                        <Typography variant="body1">
                          {worker?.profile?.name +
                            " " +
                            worker?.profile?.surname}
                        </Typography>
                        <Rating
                          name="disabled"
                          value={Number(worker.rating)}
                          readOnly
                        />
                      </ToggleButton>
                    </>
                  );
                })}
              </ToggleButtonGroup>
            )}
          />
          {workerId && (
            <Controller
              name="measurement_date"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Дата замера"
                    {...field}
                    views={["year", "month", "day", "hours"]}
                    shouldDisableTime={(time) => {
                      const hours = time.$H;
                      return hours < 9 || hours >= 18 || isTimeBlocked(time);
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          )}

          <Button variant="contained" type="submit">
            Заказать
          </Button>
        </form>
      </Modal>
    </>
  );
};
