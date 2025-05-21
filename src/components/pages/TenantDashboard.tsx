import React from "react";
import DashboardLayout from "../common/DashboardLayout";

const TenantDashboard: React.FC = () => (
  <DashboardLayout title="Tenant Dashboard">
    <h2>Welcome, Tenant!</h2>
    <p>Here you can manage your company, team, and business modules.</p>
    {/* Add tenant-specific content here */}
  </DashboardLayout>
);

export default TenantDashboard;