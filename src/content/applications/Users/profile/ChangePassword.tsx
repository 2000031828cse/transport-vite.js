import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid
} from '@mui/material';

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handlePasswordChange = (event: React.FormEvent) => {
    event.preventDefault();

    if (oldPassword == newPassword) {
      setError('New password matches with the old password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    console.log('Password changed successfully');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography component="h1" variant="h4" align="center">
          Change Password
        </Typography>
        <Box mt={3}>
          <form onSubmit={handlePasswordChange}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Old Password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button type="submit" variant="contained" color="primary">
                Change Password
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
