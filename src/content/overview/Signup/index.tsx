import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography } from '@mui/material';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username) {
      setError('Username is required');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Invalid phone number');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('phoneNumber', phoneNumber);

    navigate('/login');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        p: 2
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img height={100} src="/static/logo/tms.svg" />
      </div>
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error && !username}
            helperText={!!error && !username ? 'Username is required' : ''}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            margin="normal"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={!!error && !validatePhoneNumber(phoneNumber)}
            helperText={
              !!error && !validatePhoneNumber(phoneNumber)
                ? 'Invalid phone number'
                : ''
            }
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={
              !!error && (password.length < 6 || password !== confirmPassword)
            }
            helperText={
              !!error && password.length < 6
                ? 'Password must be at least 6 characters long'
                : ''
            }
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!error && password !== confirmPassword}
            helperText={
              !!error && password !== confirmPassword
                ? 'Passwords do not match'
                : ''
            }
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link to="/login" color="primary">
              <Typography component="span" color="primary">
                Log In
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
