import { db } from "@/shared/api/firebaseConfig";
import { useAuth } from "@/shared/hooks/useAuth";
import { Box, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AdminLayout = () => {
  const user = useAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const userId = user?.uid;

  console.log(userId);
  const getUserRole = async () => {
    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("role", "==", "admin"));

    const userData = await getDocs(userQuery);
    return userData.docs[0].data();
  };

  useLayoutEffect(() => {
    getUserRole().then((data) => {
      if (!userId) {
        setLoading(true);
      } else {
        if (data.uid !== userId) {
          console.log(data.uid, userId);
          navigate("/");
        } else {
          setLoading(false);
        }
      }
    });
  }, [userId, navigate]);

  if (loading) return <Typography>Загрузка...</Typography>;

  return (
    <Box>
      <Outlet />
    </Box>
  );
};
