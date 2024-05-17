import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(user => {
            setUser(user)
        })

        return () => unsubscribe()
    }, [])
    return user;
}