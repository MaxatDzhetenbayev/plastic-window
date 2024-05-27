import { db } from "@/shared/api/firebaseConfig";
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

  const renderStatus = (status) => {
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
          <TableCell>{orderItem.date}</TableCell>
          <TableCell>{renderStatus(orderItem.status)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open}>
              <Box sx={{ padding: "20px" }}>
                <Typography textAlign="center">Нет информации</Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
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
                    <TableCell />
                    <TableCell>ID Заказа</TableCell>
                    <TableCell>Дата</TableCell>
                    <TableCell>Статус</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <CustumRow orderItem={order} />
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
