export interface EmployeeValidationResult {
  valid: boolean;
  errors: { [field: string]: string };
}

// Validate an employee object before create/update
export function validateEmployee(employee: Partial<Employee>): EmployeeValidationResult {
  const errors: { [field: string]: string } = {};

  if (!employee.firstName || employee.firstName.trim().length < 2) {
    errors.firstName = "First name is required and must be at least 2 characters.";
  }
  if (!employee.lastName || employee.lastName.trim().length < 2) {
    errors.lastName = "Last name is required and must be at least 2 characters.";
  }
  if (!employee.contactEmail) {
    errors.contactEmail = "Email is required.";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(employee.contactEmail)) {
    errors.contactEmail = "Invalid email address.";
  }
  if (!employee.employment?.employeeNumber) {
    errors["employment.employeeNumber"] = "Employee number is required.";
  }
  if (!employee.employment?.type) {
    errors["employment.type"] = "Employment type is required.";
  }
  if (!employee.employment?.departmentId) {
    errors["employment.departmentId"] = "Department is required.";
  }
  if (!employee.employment?.positionId) {
    errors["employment.positionId"] = "Position is required.";
  }
  if (!employee.employment?.dateHired) {
    errors["employment.dateHired"] = "Date hired is required.";
  }
  // Add more rules as needed...

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}