import { getAuth } from "firebase-admin/auth";

const setClaims = async (uid: string, role: string, tenantId: string) => {
  await getAuth().setCustomUserClaims(uid, { role, tenantId });
};