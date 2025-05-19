import React from "react";
import { Box, Button, TextField, Typography, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, bgcolor: "background.paper", borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" mt={2}>
          <TextField fullWidth label="Email" margin="normal" />
          <TextField fullWidth label="Password" type="password" margin="normal" />
          <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <Button component={Link} to="/register">
              Register
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}