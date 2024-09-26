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
    console.log("logoutRequest");
  } catch (error) {
    throw ("Error signing out", error);
  }
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    mutationKey: ["logout"],
    onSuccess: () => {
      queryClient.removeQueries(["profile"]);
      queryClient.invalidateQueries(["profile"]);
      navigate("/sign-in");
    },
    onError: (error) => {
      console.error("Error signing out", error);
    },
  });
};
