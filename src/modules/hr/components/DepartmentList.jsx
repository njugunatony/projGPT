import React, { useEffect, useState } from "react";
import { getDepartments, deleteDepartment } from "../services/departmentService";
import DepartmentForm from "./DepartmentForm";
import { useAuth } from "../../../contexts/AuthContext";
import { useRBAC } from "../../../hooks/useRBAC";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DepartmentList = () => {
  const { profile } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [editing, setEditing] = useState(null);
  const canEdit = useRBAC("manage_departments");

  useEffect(() => {
    if (profile?.companyId) {
      getDepartments(profile.companyId).then(setDepartments);
    }
  }, [profile?.companyId]);

  return (
    <Box>
      <Typography variant="h6">Departments</Typography>
      {canEdit && (
        <DepartmentForm
          companyId={profile.companyId}
          onCreated={dep => setDepartments(d => [...d, dep])}
        />
      )}
      <ul>
        {departments.map(dep => (
          <li key={dep.id}>
            {editing === dep.id ? (
              <DepartmentForm
                companyId={profile.companyId}
                department={dep}
                onUpdated={updated => {
                  setDepartments(ds =>
                    ds.map(d => (d.id === updated.id ? updated : d))
                  );
                  setEditing(null);
                }}
              />
            ) : (
              <>
                <b>{dep.name}</b>
                {canEdit && (
                  <>
                    <IconButton onClick={() => setEditing(dep.id)} size="small"><EditIcon /></IconButton>
                    <IconButton onClick={() => {
                      deleteDepartment(profile.companyId, dep.id);
                      setDepartments(ds => ds.filter(d => d.id !== dep.id));
                    }} size="small" color="error"><DeleteIcon /></IconButton>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default DepartmentList;