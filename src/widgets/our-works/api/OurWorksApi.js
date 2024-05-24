import { db } from "@/shared/api/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const getOurWorks = async () => {
    const docRef = collection(db, "our-works");
    const querySnapshot = await getDocs(docRef);
    const ourWorks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return ourWorks;
}