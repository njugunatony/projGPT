import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => (
  <div className="dashboard-layout">
    {title && <header><h1>{title}</h1></header>}
    <main>{children}</main>
    <footer>
      <small>&copy; {new Date().getFullYear()} GloBOS Platform</small>
    </footer>
  </div>
);

export default DashboardLayout;