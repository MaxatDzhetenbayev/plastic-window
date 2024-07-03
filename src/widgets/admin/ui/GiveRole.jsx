import { db } from "@/shared/api/firebaseConfig";
import {
  Box,
  Container,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const roleList = ["manager", "worker", "user", "admin"];

export const GiveRole = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   const userRef = collection(db, "users");
  //   const unsubscribe = onSnapshot(userRef, (snapshot) => {
  //     const usersList = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setUsers(usersList);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  // const fetchChangeRole = async (userId, role) => {
  //   const userDocRef = doc(db, "users", userId);

  //   await updateDoc(userDocRef, {
  //     role,
  //   });
  // };

  // if (loading) return <Typography>Загрузка...</Typography>;

  return (
    <Container>
      <Box>
        <Typography variant="h4">Список пользователей</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {users.map((user) => {
            return (
              <Paper
                sx={{
                  display: "flex",
                  gap: "20px",
                  padding: "20px",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Typography>{user.email}</Typography>
                <Typography>{user.uid}</Typography>
                <Select
                  value={user.role}
                  onChange={(e) => fetchChangeRole(user.uid, e.target.value)}
                >
                  {roleList.map((role) => {
                    return (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Paper>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};
