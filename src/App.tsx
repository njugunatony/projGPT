import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Products from "./pages/Dashboard/Products";
import CustomersPage from "./pages/Dashboard/CustomersPage";
import SuppliersPage from "./pages/Dashboard/SuppliersPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/Login";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import AddProduct from "./pages/Dashboard/Products";
import EditProduct from "./pages/Dashboard/Products";
import { AuthProvider } from "./contexts/AuthContext";
import Settings from "./pages/Dashboard/Settings";
import Reports from "./pages/Dashboard/Reports";
import Jobs from "./pages/Dashboard/Jobs";
import Transport from "./pages/Dashboard/Transport";
import Documents from "./pages/Dashboard/Documents";
import Payroll from "./pages/Dashboard/Payroll";
import { Toaster } from "./components/ui/toaster";
import CustomerList from "./pages/Dashboard/CustomerList";
import CustomerDetails from "./pages/Dashboard/CustomerDetails";
import SupplierList from "./pages/Dashboard/SupplierList";
import SupplierDetails from "./pages/Dashboard/SupplierDetails";
import DocumentCreate from "./pages/Dashboard/DocumentCreate";
import DocumentDetails from "./pages/Dashboard/DocumentDetails";
import Inventory from "./pages/Dashboard/Inventory";
import POS from "./pages/Dashboard/POS";
import BalanceSheet from "./pages/Dashboard/BalanceSheet";
import Employees from "./pages/Dashboard/Employees";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Dashboard routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="customers/list" element={<CustomerList />} />
            <Route path="customers/:id" element={<CustomerDetails />} />
            <Route path="suppliers" element={<SuppliersPage />} />
            <Route path="suppliers/list" element={<SupplierList />} />
            <Route path="suppliers/:id" element={<SupplierDetails />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="transport" element={<Transport />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="documents" element={<Documents />} />
            <Route path="documents/create/:type" element={<DocumentCreate />} />
            <Route path="documents/:id" element={<DocumentDetails />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
            <Route path="pos" element={<POS />} />
            <Route path="balance-sheet" element={<BalanceSheet />} />
            <Route path="employees" element={<Employees />} />
            {/* Catch all unmatched routes */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Catch all unmatched routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
