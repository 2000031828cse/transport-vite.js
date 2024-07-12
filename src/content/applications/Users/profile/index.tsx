
// import React, { useEffect, useState } from 'react';
// import {jwtDecode, JwtPayload} from 'jwt-decode';

// import { Box, Typography, Container, Paper } from '@mui/material';

// interface User {
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
// }

// const UserProfile: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const token = sessionStorage.getItem('otptoken');
//     if (token) {
//       try {
//         const decoded = jwtDecode<JwtPayload& User>(token);
//         setUser(decoded);
//       } catch (error) {
//         console.error('Failed to decode token:', error);
//       }
//     }
//   }, []);

//   if (!user) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Box
//       sx={{
//         backgroundColor: '#1F2A40',
//         minHeight: '98vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 4
//       }}
//     >
//       <Container maxWidth="xs">
//         <Paper
//           elevation={3}
//           sx={{ padding: 6, width: '100%', borderRadius: 4, backgroundColor: '#dbf5ee' }}
//         >
//           <Typography component="h1" variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
//             User Profile
//           </Typography>
//           <Typography variant="subtitle1">Name: {user.name}</Typography>
//           <Typography variant="subtitle1">Email: {user.email}</Typography>
//           <Typography variant="subtitle1">Phone: {user.phone}</Typography>
//           <Typography variant="subtitle1">Role: {user.role}</Typography>
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default UserProfile;
import React, { useEffect, useState } from 'react';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import { Box, Typography, Container, Paper, TextField, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  phone: string;
  role: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('otptoken');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload & User>(token);
        setUser(decoded as User);
        setName(decoded.name);
        setEmail(decoded.email);
        setPhone(decoded.phone);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  // const handleSave = () => {
  //   if (user) {
  //     const updatedUser = { ...user, name, email, phone };
  //     setUser(updatedUser);
  //     setIsEditing(false);
  //   }
  // };

  // const handleCancel = () => {
  //   if (user) {
  //     setName(user.name);
  //     setEmail(user.email);
  //     setPhone(user.phone);
  //     setIsEditing(false);
  //   }
  // };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
        
      </Paper>
    </Container>
  );
};

export default UserProfile;
