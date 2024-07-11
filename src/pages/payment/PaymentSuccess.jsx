import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PaymentSuccess = () => {

    const navigate = useNavigate()

  return (
    <Container sx={{display: "flex", flexDirection: "column", justifyContent: "center", gap: "40px", height: "calc(100vh - 56px)"}}>
        <Typography variant='h3' textAlign="center">Ваша услугу оплачена!</Typography>
        <Button onClick={() => navigate('/profile')}>Перейти в профиль</Button>
    </Container>
  )
}
