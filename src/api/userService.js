import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";

// Add a new user
export const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "users"), userData);
    return docRef.id;
  } catch (e) {
    throw new Error("Error adding user: " + e.message);
  }
};

// Get all users
export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};