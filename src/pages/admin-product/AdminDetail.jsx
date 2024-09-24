import React, { useEffect, useState } from 'react'
import { UploadButton } from '@/features/upload-button/ui/UploadButton'
import { api } from '@/shared/api'
import { Modal } from '@/shared/components'
import { Box, Button, Drawer, TextField, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const AdminDetail = () => {
  const { id } = useParams()
  const { data: windows } = useQuery({
    queryKey: ['windows'],
    queryFn: async () => {
      const reponse = await api.get(`windows/${id}/items`)
      return reponse.data
    },
  })

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "70vh", overflowY: "scroll" }}>
      {windows?.map((window) => (
        <Box key={window.id} sx={{ border: "1px solid #000", borderRadius: "10px", padding: "20px 10px ", display: "flex", gap: "40px", alignItems: "center" }}>
          <Typography>{window.name}</Typography>
          <WindowItemEditModal window={window} />
        </Box>
      ))}
    </Box>
  )
}

const WindowItemEditModal = ({ window }) => {
  const [open, setOpen] = useState(false)
  const window_characteristics = ["design", "noise", "thermal"]

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue
  } = useForm({
    defaultValues: {
      characteristics: {
        design: 0,
        noise: 0,
        thermal: 0
      },
      features: []
    }
  })

  useEffect(() => {
    reset({
      ...window
    })
  }, [window])


  const { data: features } = useQuery({
    queryKey: ['features'],
    queryFn: async () => {
      const reponse = await api.get(`windows/${window.id}/features`)
      return reponse.data
    },

  })

  useEffect(() => {
    if (features) {
      setValue(
        "features",
        features.map((feature) => ({
          ...feature
        }))
      );
    }
  }, [features, setValue]);



  const { fields, append, remove } = useFieldArray({
    control,
    name: "features"
  });


  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }


  return (
    <Box>
      <Button onClick={handleOpen} >
        Редактировать
      </Button>
      <Modal handleClose={handleClose} open={open}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>Редактирование окна</Typography>
          <form style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
            <TextField
              {...register("name")}
              label="Название"
            />
            <TextField
              {...register("price")}
              label="Цена"
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
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
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
            <Button type="submit" variant="contained">Сохранить</Button>
          </form>
      </Modal>
    </Box>
  )
}