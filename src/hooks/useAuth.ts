import { useContext } from "react";
import { AuthContext } from "../components/core/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};