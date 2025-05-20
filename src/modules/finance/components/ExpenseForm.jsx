import React, { useState } from "react";
import { addExpense, updateExpense } from "../services/expenseService";
import { Button, TextField, Select, MenuItem, Box } from "@mui/material";

const categories = ["Travel", "Supplies", "Salary", "Utilities", "Other"];
const currencies = ["KES", "USD", "EUR"];

export default function ExpenseForm({ companyId, expense, onCreated, onUpdated }) {
  const [form, setForm] = useState({
    category: expense?.category || "Other",
    amount: expense?.amount || "",
    currency: expense?.currency || "KES",
    date: expense?.date || "",
    notes: expense?.notes || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({
    ...f,
    [e.target.name]: e.target.value
  }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (expense) {
        const updated = await updateExpense(companyId, expense.id, form);
        onUpdated && onUpdated(updated);
      } else {
        const created = await addExpense(companyId, form);
        onCreated && onCreated(created);
        setForm({
          category: "Other",
          amount: "",
          currency: "KES",
          date: "",
          notes: "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "inline", mr: 2 }}>
      <Select size="small" name="category" value={form.category} onChange={handleChange}>
        {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
      </Select>
      <TextField size="small" name="amount" value={form.amount} onChange={handleChange} required placeholder="Amount" type="number" />
      <Select size="small" name="currency" value={form.currency} onChange={handleChange}>
        {currencies.map(cur => <MenuItem key={cur} value={cur}>{cur}</MenuItem>)}
      </Select>
      <TextField size="small" name="date" value={form.date} onChange={handleChange} type="date" required />
      <TextField size="small" name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
      <Button type="submit" variant="contained" size="small" disabled={loading}>{expense ? "Update" : "Add"}</Button>
    </Box>
  );
}