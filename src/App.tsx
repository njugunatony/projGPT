import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./components/core/AuthContext";
import ProtectedRoute from "./components/core/ProtectedRoute";
import DashboardLayout from "./components/common/DashboardLayout";

// Auth pages
import Login from "./components/auth/Login";
import Signup from
