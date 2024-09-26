import { api } from '@/shared/api';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const RequestsPage = () => {
    const navigate = useNavigate();
    const { data: requests, isLoading, isSuccess } = useQuery({
        queryKey: ["requests"],
        queryFn: async () => {
            try {
                const response = await api.get(`user-requests`, {
                    withCredentials: true,
                });

                return response.data;
            } catch (error) {
                console.log(error);
                return [];
            }
        },
    });

    if (isLoading) return <Box>Loading...</Box>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Почта</TableCell>
                        <TableCell >Полное имя</TableCell>
                        <TableCell >Статус</TableCell>
                        <TableCell >Детали</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests?.map?.((request) => (
                        <TableRow key={request.id}>
                            <TableCell component="th" scope="row">
                                {request.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {request.email}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {request.fullname}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {request?.detail?.status}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => navigate(`${request.id}`)} variant="contained" color="primary">Подробнее</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}