import React, { useState } from "react";
import { addStaff, updateStaff } from "../services/staffService";
import { ROLES } from "../../../constants/roles";
import { Button, TextField, Select, MenuItem, Box } from "@mui/material";

const StaffForm = ({ companyId, staff, onCreated, onUpdated }) => {
  const [form, setForm] = useState({
    name: staff?.name || "",
    email: staff?.email || "",
    role: staff?.role || "employee",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (staff) {
        const updated = await updateStaff(companyId, staff.id, form);
        onUpdated && onUpdated(updated);
      } else {
        const created = await addStaff(companyId, form);
        onCreated && onCreated(created);
        setForm({ name: "", email: "", role: "employee" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "inline", mr: 2 }}>
      <TextField size="small" name="name" value={form.name} onChange={handleChange} required placeholder="Full name" />
      <TextField size="small" name="email" value={form.email} onChange={handleChange} required placeholder="Email" />
      <Select size="small" name="role" value={form.role} onChange={handleChange}>
        {Object.keys(ROLES).map(r => (
          <MenuItem key={r} value={r}>{ROLES[r]}</MenuItem>
        ))}
      </Select>
      <Button type="submit" variant="contained" size="small" disabled={loading}>{staff ? "Update" : "Add"}</Button>
    </Box>
  );
};

export default StaffForm;