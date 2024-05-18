import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useLayoutEffect } from "react";
import { auth } from "../../shared/api/firebaseConfig";
export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  return user;
};
