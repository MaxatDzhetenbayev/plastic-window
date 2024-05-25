import { auth, db } from "@/shared/api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
export const fetchCreateAccount = async (email, password) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const id = userCredentials.user.uid;

    const userDoc = doc(db, "users", id);

    await setDoc(userDoc, {
      uid: id,
      email,
      role: "user",
    });
  } catch (error) {
    console.error(error);
  }
};
