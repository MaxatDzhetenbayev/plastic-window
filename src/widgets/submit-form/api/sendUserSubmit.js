import { db } from "@/shared/api/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

export const sendUserSubmit = async (info) => {
  try {
    const collectionRef = collection(db, "user-submits");

    await addDoc(collectionRef, info);
    toast.success("Ваша заявка успешно отправлена!");
  } catch (e) {
    toast.error("Произошла ошибка при отправке заявки!");
    console.error("Error adding document: ", e);
  }
};
