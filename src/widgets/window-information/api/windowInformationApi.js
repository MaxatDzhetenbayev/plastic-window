import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/shared/api/firebaseConfig"

export const getWindowModels = async () => {
    const docRef = collection(db, "windows");
    const querySnapshot = await getDocs(docRef);
    const windowModelList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return windowModelList;
}

export const getWindowItems = async (modelId) => {
    const docRef = collection(db, `windows/${modelId}/items`);
    const querySnapshot = await getDocs(docRef);
    const windowItems = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return windowItems;
}

export const getItemInfo = async (itemId) => {
    const docRef = doc(db, `windows/d8X8q2HeqsK5L2RmXRKM/items/${itemId}`);
    const docSnapshot = await getDoc(docRef);
    const itemInfo = { id: docSnapshot.id, ...docSnapshot.data() };

    if (!docSnapshot.exists()) {
        return null;
    }

    return itemInfo;
}