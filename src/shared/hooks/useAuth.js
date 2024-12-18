import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const fetchUser = async () => {
  const response = await api.get("auth/profile", {
    withCredentials: true,
  });
  return response.data;
};

export const useAuth = () => {
  const { data: user, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUser,
    staleTime: 60 * 60 * 1000, // 60 минут
    cacheTime: 120 * 60 * 1000, // 120 минут

  });



  return [user, isSuccess];
};
