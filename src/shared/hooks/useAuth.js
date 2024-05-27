import { useState, useEffect } from "react";
import { auth, db } from "../../shared/api/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userDoc = doc(db, "users", authUser.uid);
        const userData = await getDoc(userDoc);
        const updatedUser = {
          ...authUser,
          role: userData.exists() ? userData.data().role : null,
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return user;
};
