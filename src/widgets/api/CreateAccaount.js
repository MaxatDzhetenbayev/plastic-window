import { auth } from "@/shared/api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const fetchCreateAccount = async (email, password, role) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  console.log(userCredential.user.uid);

  //   const userRef = collection(db, "users");
};
