import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const subscriptionService = {
  getSubscription: async (userId?: string) => {
    // Dummy implementation; replace as needed based on your DB structure
    if (!userId) return { plan: "Free", status: "active" };
    const ref = doc(db, "subscriptions", userId);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return { plan: "Free", status: "inactive" };
    }
  },
  updateSubscription: async (userId: string, planId: string) => {
    const ref = doc(db, "subscriptions", userId);
    await setDoc(ref, { plan: planId, status: "active" }, { merge: true });
    return { plan: planId, status: "active" };
  },
  cancelSubscription: async (userId: string) => {
    const ref = doc(db, "subscriptions", userId);
    await setDoc(ref, { status: "cancelled" }, { merge: true });
    return { status: "cancelled" };
  },
};