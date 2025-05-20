import { useAuth } from "../contexts/AuthContext";
import { ROLE_PERMISSIONS } from "../constants/roles";

export function useRBAC(permission) {
  const { profile } = useAuth();
  if (!profile) return false;
  const permissions = ROLE_PERMISSIONS[profile.role] || [];
  return permissions.includes("*") || permissions.includes(permission);
}