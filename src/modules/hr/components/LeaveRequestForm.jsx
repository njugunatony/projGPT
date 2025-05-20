import React, { useState } from "react";
import { requestLeave } from "../services/leaveService";
import { Button, TextField, Select, MenuItem, Box } from "@mui/material";

const LeaveRequestForm = ({ companyId, staffId, onCreated }) => {
  const [form, setForm] = useState({
    type: "annual",
    start: "",
    end: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const req = await requestLeave(companyId, { ...form, staffId, staffName: "Me" });
      onCreated && onCreated(req);
      setForm({ type: "annual", start: "", end: "", reason: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "inline", mr: 2 }}>
      <Select size="small" name="type" value={form.type} onChange={handleChange}>
        <MenuItem value="annual">Annual</MenuItem>
        <MenuItem value="sick">Sick</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </Select>
      <TextField size="small" name="start" type="date" value={form.start} onChange={handleChange} required />
      <TextField size="small" name="end" type="date" value={form.end} onChange={handleChange} required />
      <TextField size="small" name="reason" value={form.reason} onChange={handleChange} placeholder="Reason" />
      <Button type="submit" variant="contained" size="small" disabled={loading}>Request</Button>
    </Box>
  );
};

export default LeaveRequestForm;