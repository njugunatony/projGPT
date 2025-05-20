// Mocked services. Replace with Firestore/Backend in production.
export const getDepartments = async (companyId) => {
  // Simulate DB: return static or fetch from backend
  return [
    { id: "dep1", name: "Engineering" },
    { id: "dep2", name: "Sales" },
  ];
};

export const addDepartment = async (companyId, data) => {
  // Simulate DB: return created
  return { id: Date.now().toString(), ...data };
};

export const updateDepartment = async (companyId, deptId, data) => {
  // Simulate DB: return updated
  return { id: deptId, ...data };
};

export const deleteDepartment = async (companyId, deptId) => {
  // Simulate DB: success
  return true;
};