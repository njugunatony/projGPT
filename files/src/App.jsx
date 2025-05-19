import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HRDashboard from "./modules/hr/pages/HRDashboard";
import LogisticsDashboard from "./modules/logistics/pages/LogisticsDashboard";
import ECommerceDashboard from "./modules/ecommerce/pages/ECommerceDashboard";
import InvoicingDashboard from "./modules/invoicing/pages/InvoicingDashboard";
import RemoteWorkDashboard from "./modules/remotework/pages/RemoteWorkDashboard";
import FinanceDashboard from "./modules/finance/pages/FinanceDashboard";
import SupportDashboard from "./modules/support/pages/SupportDashboard";
import AnalyticsDashboard from "./modules/analytics/pages/AnalyticsDashboard";
import RealEstateLanding from "./modules/realestate/pages/RealEstateLanding";
import NotFound from "./pages/NotFound";
import MainLayout from "./layout/MainLayout";

const ProtectedRoute = ({ children }) => {
  // TODO: Add real auth check
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hr/*" element={
            <ProtectedRoute>
              <HRDashboard />
            </ProtectedRoute>
          } />
          <Route path="/logistics/*" element={<LogisticsDashboard />} />
          <Route path="/ecommerce/*" element={<ECommerceDashboard />} />
          <Route path="/invoicing/*" element={<InvoicingDashboard />} />
          <Route path="/remotework/*" element={<RemoteWorkDashboard />} />
          <Route path="/finance/*" element={<FinanceDashboard />} />
          <Route path="/support/*" element={<SupportDashboard />} />
          <Route path="/analytics/*" element={<AnalyticsDashboard />} />
          <Route path="/realestate/*" element={<RealEstateLanding />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}