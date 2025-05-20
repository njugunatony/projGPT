import React, { useState } from "react";
import { addInvoice, updateInvoice } from "../services/invoiceService";
import { Button, TextField, Select, MenuItem, Box } from "@mui/material";

const currencies = ["KES", "USD", "EUR"];

export default function InvoiceForm({ companyId, invoice, onCreated, onUpdated }) {
  const [form, setForm] = useState({
    number: invoice?.number || "",
    customer: invoice?.customer || "",
    amount: invoice?.amount || "",
    currency: invoice?.currency || "KES",
    status: invoice?.status || "unpaid",
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
      if (invoice) {
        const updated = await updateInvoice(companyId, invoice.id, form);
        onUpdated && onUpdated(updated);
      } else {
        const created = await addInvoice(companyId, form);
        onCreated && onCreated(created);
        setForm({
          number: "",
          customer: "",
          amount: "",
          currency: "KES",
          status: "unpaid",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "inline", mr: 2 }}>
      <TextField size="small" name="number" value={form.number} onChange={handleChange} required placeholder="Invoice #" />
      <TextField size="small" name="customer" value={form.customer} onChange={handleChange} required placeholder="Customer" />
      <TextField size="small" name="amount" value={form.amount} onChange={handleChange} required placeholder="Amount" type="number" />
      <Select size="small" name="currency" value={form.currency} onChange={handleChange}>
        {currencies.map(cur => <MenuItem key={cur} value={cur}>{cur}</MenuItem>)}
      </Select>
      <Select size="small" name="status" value={form.status} onChange={handleChange}>
        <MenuItem value="unpaid">Unpaid</MenuItem>
        <MenuItem value="paid">Paid</MenuItem>
        <MenuItem value="overdue">Overdue</MenuItem>
      </Select>
      <Button type="submit" variant="contained" size="small" disabled={loading}>{invoice ? "Update" : "Add"}</Button>
    </Box>
  );
}