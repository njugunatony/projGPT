import { db } from "../firebase";
import { collection, doc, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Employee } from "../models/Employee";

const employeeCollection = (companyId: string) =>
  collection(db, "companies", companyId, "employees");

export const employeeService = {
  list: async (companyId: string): Promise<Employee[]> => {
    const snap = await getDocs(employeeCollection(companyId));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Employee));
  },
  get: async (companyId: string, employeeId: string): Promise<Employee | null> => {
    const docRef = doc(db, "companies", companyId, "employees", employeeId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Employee) : null;
  },
  create: async (companyId: string, data: Omit<Employee, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const docRef = await addDoc(employeeCollection(companyId), { ...data, createdAt: now, updatedAt: now });
    return { id: docRef.id, ...data, createdAt: now, updatedAt: now };
  },
  update: async (companyId: string, employeeId: string, data: Partial<Employee>) => {
    const now = new Date().toISOString();
    const docRef = doc(db, "companies", companyId, "employees", employeeId);
    await updateDoc(docRef, { ...data, updatedAt: now });
  },
  remove: async (companyId: string, employeeId: string) => {
    const docRef = doc(db, "companies", companyId, "employees", employeeId);
    await deleteDoc(docRef);
  }
};