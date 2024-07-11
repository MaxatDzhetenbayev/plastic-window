import { Box, Container, Typography } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Payment as PaymentWidget } from "@widgets/payment/ui/Payment";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
const stripePromise = loadStripe(
    "pk_test_51PZzt1Ano0RJV2sOyNXjUHN552ymUjoMcj4qC66aLzrjwevssMJWzqELG4rOJulKZsbRX6o0piLMkKcH1HvsCRaO00wtxBsbR8"
);

export const Payment = () => {

    const [clientSecret, setClientSecret] = useState("");
    const { requestId } = useParams()

   

    const { data } = useQuery({
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/user-requests/${requestId}`,
                    {
                        withCredentials: true,
                    }
                );
                return response.data;
            } catch (error) {
                console.error("Ошибка при получении данных: ", error);
            }
        }
    })


    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:3000/payment/intent",
                    {
                        requestId: requestId,
                    },
                    {
                        withCredentials: true,
                    }
                );
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error("Ошибка при получении clientSecret: ", error);
            }
        };

        fetchClientSecret();
    }, []);

    const handleCalculate = (height, width) => {
        const itemPrice = data.detail.item.price
        const calcHeight = height / 100;
        const calcWidth = width / 100;
    
        return Math.ceil(calcHeight * calcWidth * itemPrice);
      };

    return (
        clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <Container sx={{
                    height: "calc(100vh - 56px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",

                }}>
                    <Box>
                        <Typography variant="h4" textAlign="center">Оплата</Typography>
                        <Typography variant="h6">Название товара: {data.detail.item.name}</Typography>
                        <Typography variant="h6">Сумма к оплате: {handleCalculate(data.detail.options.height, data.detail.options.width)}тг</Typography>
                    </Box>
                    <PaymentWidget clientSecret={clientSecret}/>
                </Container>
            </Elements>
        )
    )
}
