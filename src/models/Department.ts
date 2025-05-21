export interface Department {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  parentDepartmentId?: string;
  createdAt: string;
  updatedAt: string;
}