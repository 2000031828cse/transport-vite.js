import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid
} from '@mui/material';

interface UserProfile {
  name: string;
  email: string;
  phoneNumber: string;
}

const Profile: React.FC = () => {
  const initialUser: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890'
  };

  const [user, setUser] = useState<UserProfile>(initialUser);
  const [name, setName] = useState<string>(initialUser.name);
  const [email, setEmail] = useState<string>(initialUser.email);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    initialUser.phoneNumber
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
  }, [user]);

  const handleSave = () => {
    // Update user profile logic here (could be an API call)
    const updatedUser: UserProfile = { ...user, name, email, phoneNumber };
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setIsEditing(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography component="h1" variant="h4" align="center">
          Profile
        </Typography>
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="space-between">
          {isEditing ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
          <Button
            component={Link}
            to="/dashboards/profile/change-password"
            variant="contained"
            color="secondary"
          >
            Change Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
