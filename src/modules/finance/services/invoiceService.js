import { db } from "../../../firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";

// Get all invoices for a company
export const getInvoices = async (companyId) => {
  const colRef = collection(db, "companies", companyId, "invoices");
  const q = query(colRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add an invoice
export const addInvoice = async (companyId, data) => {
  const colRef = collection(db, "companies", companyId, "invoices");
  const docRef = await addDoc(colRef, {
    ...data,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...data, createdAt: new Date().toISOString() };
};

// Update an invoice
export const updateInvoice = async (companyId, invoiceId, data) => {
  const docRef = doc(db, "companies", companyId, "invoices", invoiceId);
  await updateDoc(docRef, data);
  return { id: invoiceId, ...data };
};

// Delete an invoice
export const deleteInvoice = async (companyId, invoiceId) => {
  const docRef = doc(db, "companies", companyId, "invoices", invoiceId);
  await deleteDoc(docRef);
  return true;
};