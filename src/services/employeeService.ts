import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Employee } from "../models/Employee";

export const employeeService = {
  list: async (tenantId: string): Promise<Employee[]> => {
    const snap = await getDocs(collection(db, "employees"));
    return snap.docs
      .map(d => ({ id: d.id, ...(d.data() as any) }))
      .filter(e => e.tenantId === tenantId);
  },
  create: async (data: Omit<Employee, "id">): Promise<Employee> => {
    const docRef = await addDoc(collection(db, "employees"), data);
    return { ...data, id: docRef.id };
  },
  get: async (id: string): Promise<Employee | null> => {
    const docSnap = await getDoc(doc(db, "employees", id));
    return docSnap.exists() ? { id, ...(docSnap.data() as any) } : null;
  },
  update: async (id: string, data: Partial<Employee>): Promise<void> => {
    await updateDoc(doc(db, "employees", id), data);
  },
  remove: async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "employees", id));
  }
};