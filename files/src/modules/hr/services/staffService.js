// Mocked services. Replace with Firestore/Backend in production.
export const getStaff = async (companyId) => {
  return [
    { id: "emp1", name: "Alice", email: "alice@corp.com", role: "employee" },
    { id: "emp2", name: "Bob", email: "bob@corp.com", role: "manager" },
  ];
};

export const addStaff = async (companyId, data) => {
  return { id: Date.now().toString(), ...data };
};

export const updateStaff = async (companyId, staffId, data) => {
  return { id: staffId, ...data };
};

export const deleteStaff = async (companyId, staffId) => {
  return true;
};