import React from "react";
import { Box, Typography, Grid, Paper, useTheme } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

const features = [
  {
    icon: <LocalShippingIcon color="primary" sx={{ fontSize: 40 }} />,
    label: "Logistics & Transport Management",
  },
  {
    icon: <PeopleIcon color="secondary" sx={{ fontSize: 40 }} />,
    label: "Human Resource & Staff Management",
  },
  {
    icon: <StorefrontIcon sx={{ color: "#43a047", fontSize: 40 }} />,
    label: "E-commerce & Marketplace",
  },
  {
    icon: <DescriptionIcon sx={{ color: "#6d4c41", fontSize: 40 }} />,
    label: "Smart Invoicing & Documentation",
  },
  {
    icon: <WorkOutlineIcon sx={{ color: "#fbc02d", fontSize: 40 }} />,
    label: "Remote Work & Freelance Hiring",
  },
  {
    icon: <CreditCardIcon sx={{ color: "#1976d2", fontSize: 40 }} />,
    label: "Finance & Payments",
  },
  {
    icon: <SupportAgentIcon sx={{ color: "#d32f2f", fontSize: 40 }} />,
    label: "Customer Support & CRM",
  },
  {
    icon: <AssessmentIcon sx={{ color: "#1976d2", fontSize: 40 }} />,
    label: "Analytics & Insights",
  },
  {
    icon: <HomeWorkIcon sx={{ color: "#795548", fontSize: 40 }} />,
    label: "Real Estate Management",
  },
];

export default function CoreObjective() {
  const theme = useTheme();

  return (
    <Box sx={{ py: 4, background: theme.palette.background.paper }}>
      <Typography variant="h4" align="center" fontWeight={700} color="primary" gutterBottom>
        Core Objective
      </Typography>
      <Typography align="center" sx={{ mb: 4, color: "text.secondary" }}>
        To converge all critical business functions into one smart, all-in-one platform — seamlessly combining:
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {features.map((f, i) => (
          <Grid item xs={12} sm={6} md={4} key={f.label}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 160,
                borderRadius: 3,
              }}
            >
              {f.icon}
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ mt: 2, color: "text.primary", fontWeight: 500 }}
              >
                {f.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}