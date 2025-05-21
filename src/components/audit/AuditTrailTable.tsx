import React, { useEffect, useState } from "react";
import { fetchAuditTrail, AuditTrailLog } from "../../services/auditTrailService";

export const AuditTrailTable: React.FC<{ companyId: string; entityId?: string }> = ({
  companyId,
  entityId,
}) => {
  const [logs, setLogs] = useState<AuditTrailLog[]>([]);
  useEffect(() => {
    fetchAuditTrail(companyId, entityId).then(setLogs);
  }, [companyId, entityId]);
  return (
    <div>
      <h3>Audit Trail</h3>
      <table border={1} cellPadding={4}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Action</th>
            <th>Entity</th>
            <th>Entity ID</th>
            <th>By</th>
            <th>Changes</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.timestamp}</td>
              <td>{log.action}</td>
              <td>{log.entity}</td>
              <td>{log.entityId}</td>
              <td>{log.performedByName || log.performedBy}</td>
              <td>
                <pre style={{ maxWidth: 200, overflowX: "auto" }}>
                  {log.changes ? JSON.stringify(log.changes, null, 2) : ""}
                </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};