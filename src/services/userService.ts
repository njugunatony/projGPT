import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "../models/User";

export const userService = {
  getUserProfile: async (userId: string): Promise<User | null> => {
    const ref = doc(db, "users", userId);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      return docSnap.data() as User;
    }
    return null;
  },
  updateUserProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    const ref = doc(db, "users", userId);
    await setDoc(ref, data, { merge: true });
    const updatedDoc = await getDoc(ref);
    return updatedDoc.data() as User;
  },
};