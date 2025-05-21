export interface User {
  id: string;
  email: string;
  role: "superadmin" | "tenant";
  tenantId?: string;
  displayName?: string;
}