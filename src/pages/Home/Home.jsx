import { useAuth } from "@/shared/hooks/useAuth";
import React from "react";

export const Home = () => {
  const user = useAuth();
  console.log(user?.uid);

  return <div>Главная</div>;
};
