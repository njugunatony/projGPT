import React from "react";
import DashboardLayout from "../common/DashboardLayout";

const SuperAdminDashboard: React.FC = () => (
  <DashboardLayout title="SuperAdmin Dashboard">
    <h2>Welcome, SuperAdmin!</h2>
    <p>Here you can manage all companies, users, and platform-wide settings.</p>
    {/* Add superadmin-specific content here */}
  </DashboardLayout>
);

export default SuperAdminDashboard;