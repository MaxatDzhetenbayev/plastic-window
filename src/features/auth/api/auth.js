import { api } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const logoutRequest = async () => {
  try {
    await api.post(
      "auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error signing out", error);
  }
};

export const useLogout = () => {
  const alm = 12;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: logoutRequest,
    mutationKey: "login",
    onSuccess: () => {
      queryClient.clear();
      queryClient.invalidateQueries("login");
      navigate("/sign-in");
    },
    onError: (error) => {
      console.error("Error signing out", error);
    },
  });

  return mutate;
};
