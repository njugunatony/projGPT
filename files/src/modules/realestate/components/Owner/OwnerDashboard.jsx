import React from "react";
import OwnerPropertiesList from "./OwnerPropertiesList";
import IncomeExpenseReport from "./IncomeExpenseReport";
import TenantManagement from "./TenantManagement";

export default function OwnerDashboard() {
  return (
    <div>
      <h2>My Properties</h2>
      <OwnerPropertiesList />
      <h3>Income & Expenses</h3>
      <IncomeExpenseReport />
      <h3>Tenant Management</h3>
      <TenantManagement />
    </div>
  );
}