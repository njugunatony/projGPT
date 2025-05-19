import React, { createContext, useState, useEffect, useContext } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Placeholder for demo; real app: use Firebase Auth
  const [user, setUser] = useState({ uid: "demo", name: "Demo User", role: "company_admin", companyId: "companyA" });
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);

  // Uncomment for real Firebase Auth
  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, setUser);
  //   return () => unsub();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);