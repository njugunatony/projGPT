import React from "react";
import DepartmentList from "../components/DepartmentList";
import StaffList from "../components/StaffList";
import LeaveRequests from "../components/LeaveRequests";
import HRActivityLog from "../components/HRActivityLog";
import { Box, Typography, Divider } from "@mui/material";

export default function HRDashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>
        HR & Department Intelligence
      </Typography>
      <Divider sx={{ my: 2 }} />
      <DepartmentList />
      <Divider sx={{ my: 2 }} />
      <StaffList />
      <Divider sx={{ my: 2 }} />
      <LeaveRequests />
      <Divider sx={{ my: 2 }} />
      <HRActivityLog />
    </Box>
  );
}