import React, { useState } from "react";
import { addDepartment, updateDepartment } from "../services/departmentService";
import { Button, TextField, Box } from "@mui/material";

const DepartmentForm = ({ companyId, department, onCreated, onUpdated }) => {
  const [name, setName] = useState(department?.name || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (department) {
        const updated = await updateDepartment(companyId, department.id, { name });
        onUpdated && onUpdated(updated);
      } else {
        const dep = await addDepartment(companyId, { name });
        onCreated && onCreated(dep);
        setName("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "inline", mr: 2 }}>
      <TextField size="small" value={name} onChange={e => setName(e.target.value)} required placeholder="Department name" />
      <Button type="submit" variant="contained" size="small" disabled={loading}>
        {department ? "Update" : "Add"}
      </Button>
    </Box>
  );
};

export default DepartmentForm;