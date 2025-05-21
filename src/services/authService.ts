import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { User } from "../models/User";

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // You may want to fetch custom claims/roles from Firestore or elsewhere here
    return {
      id: user.uid,
      email: user.email || "",
      role: "tenant", // Default, fetch actual role as needed
      subscriptionStatus: "active", // Fetch from database as needed
    };
  },
  signup: async (email: string, password: string): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Set default role/subscription; update as needed
    return {
      id: user.uid,
      email: user.email || "",
      role: "tenant",
      subscriptionStatus: "active",
    };
  },
  forgotPassword: async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  },
};