// import React, { useState } from 'react';
// import { Box, Button, Container, TextField, Typography, Paper  } from '@mui/material';
// import {   useNavigate } from 'react-router-dom';

 
// const OtpVerification: React.FC = () => {
     
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const navigate = useNavigate();
  
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
//     const value = e.target.value;
//     if (/^\d?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Move to next input field if the current input field has a value
//       if (value && index < 5) {
//         const nextField = document.getElementById(`otp-${index + 1}`);
//         if (nextField) nextField.focus();
//       }
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = sessionStorage.getItem('token');
//       const body = {
//         token: token,
//         code: otp.join(''),
//       };
  
//       const response = await fetch("/v2/api/transport/users/verify-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         sessionStorage.setItem('otptoken', data.token);
//         localStorage.setItem('role', data.user.role); // Set role in local storage
//         if (data.user.role === "admin") {
//             console.log(data.user.role,"Admin")
//             navigate('/dashboards/StudentTable'); // Redirect to user dashboard
//             console.log("hsadjkds")
//         } else {
//             console.log(data.user.role,"User ")
//           navigate("/dashbaords/User");
//         }
//       } else {
//         console.error("Failed to verify otp");
//       }
//     } catch (error) {
//       console.error("Error verifying otp:", error);
//     }
//   };
  
  

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
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Typography
//               component="h1"
//               variant="h6"
//               sx={{ fontWeight: 600, fontSize: '1.5rem', marginBottom: 2 }}
//             >
//               OTP Verification
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               An OTP has been sent to your mobile
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               gap: 1,
//               marginBottom: 3,
//               marginTop: 2
//             }}
//           >
//             {otp.map((digit, index) => (
//               <TextField
//                 key={index}
//                 id={`otp-${index}`}
//                 value={digit}
//                 onChange={(e) => handleChange(e, index)}
//                 inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
//                 size="small"
//               />
//             ))}
//           </Box>
//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             sx={{ textTransform: 'none' }}
//           >
//             Verify OTP
//           </Button>
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default OtpVerification;

import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input field if the current input field has a value
      if (value && index < 5) {
        const nextField = document.getElementById(`otp-${index + 1}`);
        if (nextField) nextField.focus();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const body = {
        token: token,
        code: otp.join(''),
      };

      const response = await fetch("/v2/api/transport/users/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('otptoken', data.token);
        localStorage.setItem('role', data.user.role); // Set role in local storage
        console.log('OTP verified successfully:', data);

        if (data.user.role === "admin") {
          console.log(data.user.role, "Admin"); 
          navigate('/dashboards/Admin'); // Redirect to user dashboard
        } else {
          console.log(data.user.role, "User");
          navigate("/dashboards/User");
        }
      } else {
        console.error("Failed to verify otp", data);
      }
    } catch (error) {
      console.error("Error verifying otp:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1F2A40',
        minHeight: '98vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{ padding: 6, width: '100%', borderRadius: 4, backgroundColor: '#dbf5ee' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              sx={{ fontWeight: 600, fontSize: '1.5rem', marginBottom: 2 }}
            >
              OTP Verification
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              An OTP has been sent to your mobile
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              marginBottom: 3,
              marginTop: 2
            }}
          >
            {otp.map((digit, index) => (
              <TextField
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                size="small"
              />
            ))}
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ textTransform: 'none' }}
          >
            Verify OTP
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default OtpVerification;
