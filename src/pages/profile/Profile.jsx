import { useAuth } from "@/shared/hooks/useAuth";
import {
  Box,
  Collapse,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Payment } from "@widgets/payment/ui/Payment";

const stripePromise = loadStripe(
  "pk_test_51PZzt1Ano0RJV2sOyNXjUHN552ymUjoMcj4qC66aLzrjwevssMJWzqELG4rOJulKZsbRX6o0piLMkKcH1HvsCRaO00wtxBsbR8"
);

export const Profile = () => {
  const user = useAuth();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/payment/intent",
          {
            amount: 5000,
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

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user-requests/user`,
          {
            withCredentials: true,
          }
        );
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
                <Typography textAlign="center"></Typography>
                {orderItem.detail.status}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
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
              <Payment clientSecret={clientSecret} />
            </Box>
          </Container>
        </Box>
      </Elements>
    )
  );
};
