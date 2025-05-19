import React, { useEffect, useState } from "react";
import { getStaff, deleteStaff } from "../services/staffService";
import StaffForm from "./StaffForm";
import { useAuth } from "../../../contexts/AuthContext";
import { useRBAC } from "../../../hooks/useRBAC";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StaffList = () => {
  const { profile } = useAuth();
  const [staff, setStaff] = useState([]);
  const [editing, setEditing] = useState(null);
  const canEdit = useRBAC("manage_staff");

  useEffect(() => {
    if (profile?.companyId) {
      getStaff(profile.companyId).then(setStaff);
    }
  }, [profile?.companyId]);

  return (
    <Box>
      <Typography variant="h6">Staff Directory</Typography>
      {canEdit && (
        <StaffForm
          companyId={profile.companyId}
          onCreated={stf => setStaff(s => [...s, stf])}
        />
      )}
      <ul>
        {staff.map(s => (
          <li key={s.id}>
            {editing === s.id ? (
              <StaffForm
                companyId={profile.companyId}
                staff={s}
                onUpdated={updated => {
                  setStaff(ss => ss.map(stf => (stf.id === updated.id ? updated : stf)));
                  setEditing(null);
                }}
              />
            ) : (
              <>
                <b>{s.name}</b> ({s.role}) - {s.email}
                {canEdit && (
                  <>
                    <IconButton onClick={() => setEditing(s.id)} size="small"><EditIcon /></IconButton>
                    <IconButton onClick={() => {
                      deleteStaff(profile.companyId, s.id);
                      setStaff(ss => ss.filter(stf => stf.id !== s.id));
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

export default StaffList;