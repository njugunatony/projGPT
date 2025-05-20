import React, { useEffect, useState } from "react";
import { getInvoices, deleteInvoice } from "../services/invoiceService";
import InvoiceForm from "./InvoiceForm";
import { useAuth } from "../../../contexts/AuthContext";
import { useRBAC } from "../../../hooks/useRBAC";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function InvoiceList() {
  const { profile } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [editing, setEditing] = useState(null);
  const canEdit = useRBAC("manage_finance");

  useEffect(() => {
    if (profile?.companyId) {
      getInvoices(profile.companyId).then(setInvoices);
    }
  }, [profile?.companyId]);

  return (
    <Box>
      <Typography variant="h6">Invoices</Typography>
      {canEdit && (
        <InvoiceForm
          companyId={profile.companyId}
          onCreated={inv => setInvoices(i => [...i, inv])}
        />
      )}
      <ul>
        {invoices.map(inv => (
          <li key={inv.id}>
            {editing === inv.id ? (
              <InvoiceForm
                companyId={profile.companyId}
                invoice={inv}
                onUpdated={updated => {
                  setInvoices(is =>
                    is.map(i => (i.id === updated.id ? updated : i))
                  );
                  setEditing(null);
                }}
              />
            ) : (
              <>
                <b>{inv.number}</b> - {inv.customer} - {inv.amount} {inv.currency} - {inv.status}
                {canEdit && (
                  <>
                    <IconButton onClick={() => setEditing(inv.id)} size="small"><EditIcon /></IconButton>
                    <IconButton onClick={() => {
                      deleteInvoice(profile.companyId, inv.id);
                      setInvoices(is => is.filter(i => i.id !== inv.id));
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