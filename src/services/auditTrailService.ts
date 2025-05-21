import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export interface AuditTrailLog {
  id?: string;
  action: "create" | "update" | "delete";
  entity: string; // e.g. "employee"
  entityId: string;
  performedBy: string; // user id or email
  performedByName?: string;
  timestamp: string;
  changes?: Record<string, any>; // optional details (diff, payload)
}

// Write a log entry
export async function logAuditTrail(
  companyId: string,
  log: Omit<AuditTrailLog, "timestamp">
) {
  await addDoc(
    collection(db, "companies", companyId, "auditTrail"),
    {
      ...log,
      timestamp: new Date().toISOString(),
    }
  );
}

// (Optional) Load logs
export async function fetchAuditTrail(
  companyId: string,
  entityId?: string
): Promise<AuditTrailLog[]> {
  const q = collection(db, "companies", companyId, "auditTrail");
  // Add query by entityId if needed
  // ... left as an exercise for more complex filtering
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AuditTrailLog));
}