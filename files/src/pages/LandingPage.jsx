import React from "react";
import CoreObjective from "../components/CoreObjective";
import { Box, Typography, Container, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: "100vh", py: 5 }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" fontWeight="bold" color="primary" gutterBottom>
          GloBOS
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" gutterBottom>
          Global Business Operating System
        </Typography>
        <CoreObjective />
        <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
          <Button component={Link} to="/login" variant="contained" color="primary" size="large">
            Login
          </Button>
          <Button component={Link} to="/register" variant="outlined" size="large">
            Register
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}