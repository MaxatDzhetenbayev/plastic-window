import { db } from "@/shared/api/firebaseConfig";
import { useAuth } from "@/shared/hooks/useAuth";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export const Profile = () => {
  const user = useAuth();
  const userId = user?.uid;

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const fetchGetUserOrders = async (userId) => {
    setLoading(true);
    try {
      const userDoc = doc(db, "users", userId);
      const ordersCollectionRef = collection(userDoc, "orders");
      const ordersSnapshot = await getDocs(ordersCollectionRef);
      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(ordersData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGetUserOrders(userId);
  }, [userId]);

  const parseStatus = (status) => {
    switch (status) {
      case "new":
        return "В обработке";
      case "work":
        return "В работе";
      case "payment_pending":
        return "ожидание оплаты";
      case "done":
        return "Завершен";
      default:
        return "В обработке";
    }
  };

  return (
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
            {loading ? (
              <Typography>Загрузка...</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Мои заказы</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell># Заказа</TableCell>
                    <TableCell>Дата</TableCell>
                    <TableCell>Статус</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{parseStatus(order.status)}</TableCell>
                    </TableRow>
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
