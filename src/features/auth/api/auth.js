import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth, googleProvider } from "../../../shared/api/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logoutRequest = async () => {
  try {
    await axios.post(
      "http://localhost:3000/auth/logout",
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
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(logoutRequest, {
    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem("user");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error signing out", error);
    },
  });
};
