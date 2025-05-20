import React, { useEffect, useState } from "react";
import { getLeaveRequests, approveLeave, rejectLeave } from "../services/leaveService";
import { useAuth } from "../../../contexts/AuthContext";
import LeaveRequestForm from "./LeaveRequestForm";
import { useRBAC } from "../../../hooks/useRBAC";
import { Box, Typography, Button } from "@mui/material";

const LeaveRequests = () => {
  const { profile } = useAuth();
  const [requests, setRequests] = useState([]);
  const canApprove = useRBAC("manage_staff");

  useEffect(() => {
    if (profile?.companyId) {
      getLeaveRequests(profile.companyId).then(setRequests);
    }
  }, [profile?.companyId]);

  return (
    <Box>
      <Typography variant="h6">Leave Requests</Typography>
      <LeaveRequestForm
        companyId={profile.companyId}
        staffId={profile.uid}
        onCreated={req => setRequests(r => [...r, req])}
      />
      <ul>
        {requests.map(req => (
          <li key={req.id}>
            {req.staffName} - {req.type} ({req.start} to {req.end}) [{req.status}]
            {canApprove && req.status === "pending" && (
              <>
                <Button size="small" onClick={() => {
                  approveLeave(profile.companyId, req.id);
                  setRequests(rs => rs.map(rq => rq.id === req.id ? { ...rq, status: "approved" } : rq));
                }}>Approve</Button>
                <Button size="small" color="error" onClick={() => {
                  rejectLeave(profile.companyId, req.id);
                  setRequests(rs => rs.map(rq => rq.id === req.id ? { ...rq, status: "rejected" } : rq));
                }}>Reject</Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default LeaveRequests;