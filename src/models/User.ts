export interface User {
  id: string; // Firestore doc id (not UID unless you enforce it)
  email: string;
  tenantId: string;
  role: "superadmin" | "hr_admin" | "manager" | "employee";
  displayName?: string;
  createdAt: string;
  updatedAt: string;
}