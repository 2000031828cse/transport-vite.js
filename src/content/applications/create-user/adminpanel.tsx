import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useUserContext } from './UserContext';

const AdminPanel: React.FC = () => {
  const { addUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const handleCreateUser = () => {
    let isValid = true;

    // Basic validation checks
    if (username.trim() === '') {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (phoneNumber.trim() === '') {
      setPhoneNumberError('Phone number is required');
      isValid = false;
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneNumberError('Phone number should have 10 digits');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }

    if (isValid) {
      addUser({
        username,
        password,
        role: 'user',
        email,
        phoneNumber,
      });
      setMessage('User created successfully');
      setUsername('');
      setPassword('');
      setEmail('');
      setPhoneNumber('');
    }
  };

  // Email validation function
  const isValidEmail = (value: string) => {
    // Very basic email validation using regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // Phone number validation function
  const isValidPhoneNumber = (value: string) => {
    // Validate that the phone number is exactly 10 digits
    return /^\d{10}$/.test(value);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        p: 2,
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create User
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!usernameError}
          helperText={usernameError}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          margin="normal"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={!!phoneNumberError}
          helperText={phoneNumberError}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateUser}
        >
          Create User
        </Button>
        {message && (
          <Typography color="primary" mt={2}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default AdminPanel;
