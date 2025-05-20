// Mocked, replace with Firestore/Backend in production.
export const getExpenses = async (companyId) => {
  return [
    { id: "exp1", category: "Travel", amount: 3000, currency: "KES", date: "2025-05-01", notes: "Client visit" },
    { id: "exp2", category: "Supplies", amount: 500, currency: "USD", date: "2025-05-10", notes: "Office paper" },
  ];
};

export const addExpense = async (companyId, data) => {
  return { id: Date.now().toString(), ...data };
};

export const updateExpense = async (companyId, expenseId, data) => {
  return { id: expenseId, ...data };
};

export const deleteExpense = async (companyId, expenseId) => {
  return true;
};