// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Container, Box, TextField, Button, Typography } from '@mui/material';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Replace with your actual login validation logic
//     // Here, we're adding a simple role-based logic for demonstration
//     if (username === 'admin' && password === 'password') {
//       localStorage.setItem('auth', 'true');
//       localStorage.setItem('role', 'admin'); // Store role
//       navigate('/dashboards/Admin'); // Redirect to admin dashboard
//     } else if (username === 'user' && password === 'password') {
//       localStorage.setItem('auth', 'true');
//       localStorage.setItem('role', 'user'); // Store role
//       navigate('/dashboards/profile/details'); // Redirect to user dashboard
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Login
//         </Typography>
//         <form onSubmit={handleLogin}>
//           <TextField
//             label="Username"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error && <Typography color="error">{error}</Typography>}
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Login
//           </Button>
//         </form>
//         <Box mt={2}>
//           <Typography variant="body2">
//             Don't have an account?{' '}
//             <Link to="/signup" color="primary">
//               <Typography component="span" color="primary">
//                 Sign Up
//               </Typography>
//             </Link>
//           </Typography>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Login;// src/content/overview/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useUserContext } from '../../applications/create-user/UserContext';// Adjust import path as needed

const Login = () => {
  const { getUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = getUser(username); // Get user from context
    if (user && user.password === password) {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.username);

      if (user.role === 'admin') {
        navigate('/dashboards/Admin');
      } else if (user.role === 'user') {
        navigate('/dashboards/User');
      }
    } else {
      setError('Invalid username or password');
    }
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
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link to="/signup" color="primary">
              <Typography component="span" color="primary">
                Sign Up
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
