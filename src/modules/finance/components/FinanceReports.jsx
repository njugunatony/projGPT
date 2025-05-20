import React, { useEffect, useState } from "react";
import { getFinanceReports } from "../services/reportService";
import { useAuth } from "../../../contexts/AuthContext";
import { Box, Typography } from "@mui/material";

export default function FinanceReports() {
  const { profile } = useAuth();
  const [reports, setReports] = useState({});

  useEffect(() => {
    if (profile?.companyId) {
      getFinanceReports(profile.companyId).then(setReports);
    }
  }, [profile?.companyId]);

  return (
    <Box>
      <Typography variant="h6">Finance Reports</Typography>
      <ul>
        <li>P&L: {reports.pnl}</li>
        <li>Balance Sheet: {reports.balanceSheet}</li>
        <li>Cash Flow: {reports.cashFlow}</li>
      </ul>
    </Box>
  );
}