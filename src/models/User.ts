export interface User {
  id: string;
  email: string;
  role: "superadmin" | "tenant";
  subscriptionStatus: string;
  // Add other user properties as needed
}