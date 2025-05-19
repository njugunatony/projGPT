import { db } from "../../firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

// ORGANIZATIONS
export const createOrganization = async (org) => {
  const orgRef = await addDoc(collection(db, "organizations"), org);
  return orgRef.id;
};

export const getOrganizations = async () => {
  const querySnapshot = await getDocs(collection(db, "organizations"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// DEPARTMENTS
export const addDepartment = async (orgId, dept) => {
  const ref = collection(db, "organizations", orgId, "departments");
  const docRef = await addDoc(ref, dept);
  return docRef.id;
};

export const getDepartments = async (orgId) => {
  const ref = collection(db, "organizations", orgId, "departments");
  const querySnapshot = await getDocs(ref);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// STAFF
export const addStaff = async (orgId, deptId, staff) => {
  const ref = collection(
    db,
    "organizations",
    orgId,
    "departments",
    deptId,
    "staff"
  );
  const docRef = await addDoc(ref, staff);
  return docRef.id;
};

export const getStaff = async (orgId, deptId) => {
  const ref = collection(
    db,
    "organizations",
    orgId,
    "departments",
    deptId,
    "staff"
  );
  const querySnapshot = await getDocs(ref);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};