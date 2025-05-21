import React, { createContext, useContext, useState, useEffect } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../models/User";

const SUPERADMINS = [
  "njugunatoney@gmail.com",
  "githinjitoney@gmail.com",
  "njeriwakahiu44@gmail.com",
];

type AuthContextType = {
  firebaseUser: FirebaseUser | null;
  profile: User | null;
  loading: boolean;
  isSuperAdmin: boolean;
  isHR: boolean;
  isManager: boolean;
  isEmployee: boolean;
  email: string | null;
};

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  profile: null,
  loading: true,
  isSuperAdmin: false,
  isHR: false,
  isManager: false,
  isEmployee: false,
  email: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        setProfile(docSnap.exists() ? { id: user.uid, ...docSnap.data() } as User : null);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const email = profile?.email || firebaseUser?.email || null;
  const isSuperAdmin = email ? SUPERADMINS.includes(email) : false;

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        profile,
        loading,
        isSuperAdmin,
        isHR: profile?.role === "hr_admin",
        isManager: profile?.role === "manager",
        isEmployee: profile?.role === "employee",
        email,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);