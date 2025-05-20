import React from "react";
import InvoiceList from "../components/InvoiceList";
import ExpenseList from "../components/ExpenseList";
import PaymentList from "../components/PaymentList";
import FinanceReports from "../components/FinanceReports";
import { Box, Typography, Divider } from "@mui/material";

export default function FinanceDashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>
        Finance & Accounting
      </Typography>
      <Divider sx={{ my: 2 }} />
      <InvoiceList />
      <Divider sx={{ my: 2 }} />
      <ExpenseList />
      <Divider sx={{ my: 2 }} />
      <PaymentList />
      <Divider sx={{ my: 2 }} />
      <FinanceReports />
    </Box>
  );
}