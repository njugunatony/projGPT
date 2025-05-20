export const ROLES = {
  SUPERADMIN: "superadmin",
  COMPANY_ADMIN: "company_admin",
  HR: "hr",
  MANAGER: "manager",
  EMPLOYEE: "employee",
};

export const ROLE_LABELS = {
  superadmin: "Super Admin",
  company_admin: "Company Admin",
  hr: "HR",
  manager: "Manager",
  employee: "Employee",
};

export const ROLE_PERMISSIONS = {
  superadmin: ["*"],
  company_admin: ["manage_company", "manage_staff", "view_reports", "manage_departments"],
  hr: ["manage_staff", "view_reports", "manage_departments"],
  manager: ["manage_team", "onboard_staff", "view_team"],
  employee: ["view_self"],
};