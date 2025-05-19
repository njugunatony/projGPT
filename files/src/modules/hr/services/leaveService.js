// Mocked services. Replace with Firestore/Backend in production.
export const getLeaveRequests = async (companyId) => {
  return [
    { id: "req1", staffName: "Alice", type: "annual", start: "2024-07-01", end: "2024-07-05", status: "pending" },
    { id: "req2", staffName: "Bob", type: "sick", start: "2024-08-10", end: "2024-08-12", status: "approved" },
  ];
};

export const requestLeave = async (companyId, data) => {
  return { id: Date.now().toString(), ...data, status: "pending" };
};

export const approveLeave = async (companyId, reqId) => {
  return true;
};

export const rejectLeave = async (companyId, reqId) => {
  return true;
};