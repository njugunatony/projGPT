export interface User {
  id: string;
  email: string;
  tenantId: string;
  role: "superadmin" | "hr_admin" | "manager" | "employee";
  displayName?: string;
  createdAt: string;
  updatedAt: string;
}