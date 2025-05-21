import { logAuditTrail } from "./auditTrailService";

// Inside create/update/delete employee functions:
await logAuditTrail(companyId, {
  action: "update",
  entity: "employee",
  entityId: employeeId,
  performedBy: currentUser.email,
  performedByName: currentUser.displayName,
  changes: { /* diff or fields changed */ },
});