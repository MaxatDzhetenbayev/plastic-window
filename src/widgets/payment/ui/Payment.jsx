import React from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

export const Payment = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      console.error(submitError.message);
      alert("Ошибка при отправке данных формы: " + submitError.message);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment/success",
      },
    });
    // window.localStorage.setItem("paymentIntent", JSON.stringify(paymentIntent))

    if (error) {
      console.error(error.message);
      alert("Ошибка при оплате: " + error.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Оплата прошла успешно!");
      axios.post('http://localhost:3000/payment/save', {paymentIntentId: paymentIntent.id})
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit} style={{marginTop: "40px"}}>
        <PaymentElement />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!stripe}
        >
          Оплатить
        </Button>
      </form>
    </Box>
  );
};
