import React, { useEffect, useState } from "react";
import { UploadButton } from "@/features/upload-button/ui/UploadButton";
import { api } from "@/shared/api";
import { Modal } from "@/shared/components";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { queryClient } from "@/app/main";

export const AdminDetail = () => {
  const { id } = useParams();
  const { data: windows } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const reponse = await api.get(`windows/${id}/items`);
      return reponse.data;
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxHeight: "70vh",
        overflowY: "scroll",
      }}
    >
      {windows?.map((window) => (
        <Box
          key={window.id}
          sx={{
            border: "1px solid #000",
            borderRadius: "10px",
            padding: "20px 10px ",
            display: "flex",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <Typography>{window.name}</Typography>
          <WindowItemEditModal window={window} />
        </Box>
      ))}
    </Box>
  );
};

const WindowItemEditModal = ({ window }) => {
  const [open, setOpen] = useState(false);
  const window_characteristics = ["design", "noise", "thermal"];

  const { register, handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      characteristics: {
        design: 0,
        noise: 0,
        thermal: 0,
      },
      features: [],
    },
  });

  useEffect(() => {
    reset({
      ...window,
    });
  }, [window]);

  const { data: features } = useQuery({
    queryKey: ["features", window.id],
    queryFn: async () => {
      const reponse = await api.get(`windows/${window.id}/features`);
      return reponse.data;
    },
  });

  useEffect(() => {
    if (features) {
      setValue("features", features);
    }
  }, [features, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { mutate: updateWindowItem } = useMutation({
    mutationFn: async (data) => {
      await api.put(`windows/${window.id}/items`, data, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["item", window.id]);
      queryClient.invalidateQueries(["features"]);
    },
  });

  return (
    <Box>
      <Button onClick={handleOpen}>Редактировать</Button>
      <Modal handleClose={handleClose} open={open}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Редактирование окна
        </Typography>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
          onSubmit={handleSubmit(updateWindowItem)}
        >
          <TextField {...register("name")} label="Название" />
          <TextField {...register("price")} label="Цена" />
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange } }) => (
              <UploadButton onUploadComplete={(url) => onChange(url)}>
                Загрузить картинку
              </UploadButton>
            )}
          />
          <Box>
            <Typography variant="h6">Характеристики окна</Typography>
            {window_characteristics.map((characteristic) => (
              <TextField
                key={characteristic}
                {...register("characteristics." + characteristic)}
                label={characteristic}
              />
            ))}
          </Box>
          <Box>
            <Typography variant="h6">Преймущества</Typography>
            <Box>
              <Button
                variant="contained"
                onClick={() =>
                  append({
                    title: "",
                    description: "",
                  })
                }
              >
                Добавить Преимущество
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                mt: "10px",
              }}
            >
              {fields.map((feature, index) => (
                <Box key={feature.id} style={{ display: "flex", gap: "10px" }}>
                  <TextField
                    label="Название преймущества"
                    {...register(`features.${index}.title`)}
                    variant="outlined"
                    style={{ marginRight: "10px" }}
                  />
                  <TextField
                    sx={{ width: "100%" }}
                    label="Название преймущества"
                    {...register(`features.${index}.description`)}
                    variant="outlined"
                    style={{ marginRight: "10px" }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </form>
      </Modal>
    </Box>
  );
};
