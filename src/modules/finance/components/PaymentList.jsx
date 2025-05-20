import React, { useEffect, useState } from "react";
import { getPayments, deletePayment } from "../services/paymentService";
import PaymentForm from "./PaymentForm";
import { useAuth } from "../../../contexts/AuthContext";
import { useRBAC } from "../../../hooks/useRBAC";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PaymentList() {
  const { profile } = useAuth();
  const [payments, setPayments] = useState([]);
  const [editing, setEditing] = useState(null);
  const canEdit = useRBAC("manage_finance");

  useEffect(() => {
    if (profile?.companyId) {
      getPayments(profile.companyId).then(setPayments);
    }
  }, [profile?.companyId]);

  return (
    <Box>
      <Typography variant="h6">Payments</Typography>
      {canEdit && (
        <PaymentForm
          companyId={profile.companyId}
          onCreated={pay => setPayments(p => [...p, pay])}
        />
      )}
      <ul>
        {payments.map(pay => (
          <li key={pay.id}>
            {editing === pay.id ? (
              <PaymentForm
                companyId={profile.companyId}
                payment={pay}
                onUpdated={updated => {
                  setPayments(ps =>
                    ps.map(p => (p.id === updated.id ? updated : p))
                  );
                  setEditing(null);
                }}
              />
            ) : (
              <>
                {pay.date} - {pay.amount} {pay.currency} - {pay.method} [{pay.status}]
                {canEdit && (
                  <>
                    <IconButton onClick={() => setEditing(pay.id)} size="small"><EditIcon /></IconButton>
                    <IconButton onClick={() => {
                      deletePayment(profile.companyId, pay.id);
                      setPayments(ps => ps.filter(p => p.id !== pay.id));
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