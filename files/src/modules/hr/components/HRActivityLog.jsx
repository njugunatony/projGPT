import React, { useEffect, useState } from "react";
import { getHRActivity } from "../services/auditService";
import { useAuth } from "../../../contexts/AuthContext";
import { Box, Typography } from "@mui/material";

const HRActivityLog = () => {
  const { profile } = useAuth();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (profile?.companyId) {
      getHRActivity(profile.companyId).then(setLogs);
    }
  }, [profile?.companyId]);

  return (
    <Box>
      <Typography variant="h6">HR Activity Log</Typography>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            [{log.action}] {log.actorName} on {log.timestamp} - {log.details}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default HRActivityLog;