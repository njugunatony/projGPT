import React, { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../services/expenseService";
import ExpenseForm from "./ExpenseForm";
import { useAuth } from "../../../contexts/AuthContext";
import { useRBAC } from "../../../hooks/useRBAC";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ExpenseList() {
  const { profile } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const canEdit = useRBAC("manage_finance");

  useEffect(() => {
    if (profile?.companyId) {
      getExpenses(profile.companyId).then(setExpenses);
    }
  }, [profile?.companyId]);

  return (
    <Box>
      <Typography variant="h6">Expenses</Typography>
      {canEdit && (
        <ExpenseForm
          companyId={profile.companyId}
          onCreated={exp => setExpenses(e => [...e, exp])}
        />
      )}
      <ul>
        {expenses.map(exp => (
          <li key={exp.id}>
            {editing === exp.id ? (
              <ExpenseForm
                companyId={profile.companyId}
                expense={exp}
                onUpdated={updated => {
                  setExpenses(es =>
                    es.map(e => (e.id === updated.id ? updated : e))
                  );
                  setEditing(null);
                }}
              />
            ) : (
              <>
                <b>{exp.category}</b> - {exp.amount} {exp.currency} - {exp.date}
                {canEdit && (
                  <>
                    <IconButton onClick={() => setEditing(exp.id)} size="small"><EditIcon /></IconButton>
                    <IconButton onClick={() => {
                      deleteExpense(profile.companyId, exp.id);
                      setExpenses(es => es.filter(e => e.id !== exp.id));
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
}