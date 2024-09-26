import { api } from '@/shared/api';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAuth } from '@/shared/hooks/useAuth';

export const RequestDetailPage = () => {

    const { id } = useParams();
    const [user] = useAuth()

    const isWorker = user?.roles.includes("worker");

    const { data: request, isLoading, isSuccess } = useQuery({
        queryKey: ["requests", id],
        queryFn: async () => {
            try {
                const response = await api.get(`user-requests/${id}`, {
                    withCredentials: true,
                });

                return response.data;
            } catch (error) {
                console.log(error);
                return [];
            }
        },
        isEnabled: !!id,
    });

    const { mutate } = useMutation({
        mutationFn: async (data) => {

            console.log("work")
            await api.patch(
                `user-requests/${id}`,
                data,
                {
                    withCredentials: true,
                }
            );
        },
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries(["requests", id]);
        },
    });

    const { register, reset, control, handleSubmit } = useForm({
        defaultValues: {
            email: request?.email || " ",
            fullname: request?.fullname || " ",
            phone: request?.phone || " ",
            detail: {
                status: request?.detail?.status || "pending",
                item: {
                    name: request?.detail?.item?.name || " ",
                },
                measurement_date: new Date(request?.detail?.measurement_date).getDate() || " ",
                instalation_date: new Date(request?.detail?.instalation_date).getDate() || " ",
                options: {
                    width: request?.detail?.options?.width || " ",
                    height: request?.detail?.options?.height || " ",
                },
            },
        }
    })

    useEffect(() => {
        if (isSuccess) {
            reset(request);
        }
    }, [isSuccess, request, reset])

    return (
        <Box>
            <form onSubmit={handleSubmit((data) => mutate(data))}>
                <Box>
                    <Typography>Общая информация</Typography>
                    <Box sx={{
                        mt: 3,
                        display: 'flex',
                        gap: '10px',
                        flexDirection: 'column',
                    }} >
                        <TextField
                            variant='standard'
                            label='Почта'
                            disabled={isWorker}
                            {...register("email")}
                        />
                        <TextField
                            variant='standard'
                            label='Полное имя'
                            disabled={isWorker}
                            {...register("fullname")}
                        />
                        <TextField
                            variant='standard'
                            label='Телефон'
                            disabled={isWorker}
                            {...register("phone")}
                        />
                    </Box>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography>Детали заказа:</Typography>
                    <Box sx={{
                        mt: 2,
                        display: 'flex',
                        gap: '10px',
                        flexDirection: 'column',
                    }} >
                        <Controller
                            control={control}
                            name="detail.status"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    variant='standard'
                                    label='Статус'
                                    value={field.value || "pending"}
                                >
                                    <MenuItem value="pending" disabled={isWorker} >Ожидание</MenuItem>
                                    <MenuItem value="preparing" disabled={isWorker} >Подготовка</MenuItem>
                                    <MenuItem value="paid" disabled>Оплачено</MenuItem>
                                    <MenuItem value="work">В работе</MenuItem>
                                    <MenuItem value="done">Готово</MenuItem>
                                    <MenuItem value="canceled" >Отменено</MenuItem>
                                </Select>
                            )}
                        />
                        <TextField
                            variant='standard'
                            label='Продукт'
                            placeholder='Имя'
                            disabled
                            {...register("detail.item.name")}
                        />
                        <Controller
                            name="detail.measurement_date"
                            control={control}
                            defaultValue={null}
                            disabled={isWorker}
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Дата замера"
                                        {...field}
                                        value={field.value ? dayjs(field.value) : null}
                                        views={["year", "month", "day", "hours"]}
                                        shouldDisableTime={(time) => {
                                            const hours = time.$H;
                                            return hours < 9 || hours >= 18;
                                        }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                        <Controller
                            name="detail.instalation_date"
                            control={control}
                            defaultValue={null}
                            disabled={isWorker}
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Дата установки"
                                        {...field}
                                        value={field.value ? dayjs(field.value) : null}
                                        views={["year", "month", "day", "hours"]}
                                        shouldDisableTime={(time) => {
                                            const hours = time.$H;
                                            return hours < 9 || hours >= 18;
                                        }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                        <TextField
                            variant='standard'
                            label='Ширина(см)'
                            {...register("detail.options.width")}
                        />
                        <TextField
                            variant='standard'
                            label='Высота(см)'
                            {...register("detail.options.height")}
                        />
                    </Box>
                </Box>
                <Button sx={{ mt: 2 }} variant='contained'

                    type='submit'
                    fullWidth>Изменить</Button>
            </form >
        </Box >
    )
}