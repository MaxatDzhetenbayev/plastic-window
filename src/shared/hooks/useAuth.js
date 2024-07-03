import {useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async () => {
  const response = await axios.get("http://localhost:3000/auth/profile", {
    withCredentials: true,
  });
  return response.data;
};

export const useAuth = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 60 * 60 * 1000, // 60 минут
    cacheTime: 120 * 60 * 1000, // 120 минут
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
    },
    onError: () => {
      localStorage.removeItem("user");
    },
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!user && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [user]);

  return user;
};
