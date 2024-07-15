// import React, { useEffect, useState } from 'react';
// import { jwtDecode, JwtPayload } from 'jwt-decode';
// import {
//   Container,
//   Typography,
//   Paper,
//   Box,
//   Grid,
// } from '@mui/material';

// // Define the interface for bus pass details
// interface BusPassDetailsProps {
//   name: string;
//   buspassId: string;
//   status: string;
//   routeName: string;
//   stopName: string;
// }

// const BusPassDetails: React.FC<BusPassDetailsProps> = ({
//   name,
//   buspassId,
//   status,
//   routeName,
//   stopName,
// }) => {
//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Paper elevation={3} sx={{ p: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Bus Pass Details
//         </Typography>
//         <Box sx={{ mb: 2 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Student Name:
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">{name}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Pass ID:
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">{buspassId}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Approval Status:
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">{status}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Route Name:
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">{routeName}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Stop Name:
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">{stopName}</Typography>
//             </Grid>
//           </Grid>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// const PassDetails: React.FC = () => {
//   const [busPassDetails, setBusPassDetails] = useState<BusPassDetailsProps | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const token = sessionStorage.getItem('otptoken');
//     if (token) {
//       try {
//         const decoded = jwtDecode<JwtPayload & { userId: number }>(token);
//         const userId = decoded.userId;

//         const fetchBusPassDetails = async () => {
//           try {
//             const response = await fetch(`/v2/api/transport/buspasses/${userId}`, {
//               headers: {
//                 'Authorization': `Bearer ${token}`
//               }
//             });
//             if (response.ok) {
//               const data = await response.json();
//               setBusPassDetails({
//                 name: data.student.name,
//                 buspassId: data.buspassId,
//                 status: data.status,
//                 routeName: data.routeName,
//                 stopName: data.assignedStop || data.requestStopName,
//               });
//             } else if (response.status === 403) {
//               setError('You are not allowed to perform this operation.');
//             } else {
//               setError('Failed to fetch bus pass details.');
//               console.error('Failed to fetch bus pass details:', response.statusText);
//             }
//           } catch (error) {
//             setError('Failed to fetch bus pass details.');
//             console.error('Failed to fetch bus pass details:', error);
//           }
//         };

//         fetchBusPassDetails();
//       } catch (error) {
//         setError('Failed to decode token.');
//         console.error('Failed to decode token:', error);
//       }
//     }
//   }, []);

//   if (error) {
//     return <Typography>{error}</Typography>;
//   }

//   if (!busPassDetails) {
//     return <Typography>Loading...</Typography>;
//   }

//   return <BusPassDetails {...busPassDetails} />;
// };

// export default PassDetails;

import React, { useEffect, useState } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
} from '@mui/material';

// Define the interface for bus pass details
interface BusPassDetailsProps {
  name: string;
  buspassId: string;
  status: string;
  routeName: string;
  stopName: string;
  feeStatus: boolean;
}

const BusPassDetails: React.FC<BusPassDetailsProps> = ({
  name,
  buspassId,
  status,
  routeName,
  stopName,
  feeStatus,
}) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Bus Pass Details
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Student Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Pass ID:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{buspassId}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Approval Status:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{status}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Route Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{routeName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Stop Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{stopName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Fee Status:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{feeStatus ? 'Paid' : 'Unpaid'}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

const PassDetails: React.FC = () => {
  const [busPassDetails, setBusPassDetails] = useState<BusPassDetailsProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('otptoken');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload & { userId: number }>(token);
        const userId = decoded.userId;

        const fetchBusPassDetails = async () => {
          try {
            const response = await fetch(`/v2/api/transport/buspasses/${userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            if (response.ok) {
              const data = await response.json();
              setBusPassDetails({
                name: data.student.name,
                buspassId: data.buspassId,
                status: data.status,
                routeName: data.routeName,
                stopName: data.assignedStop || data.requestStopName,
                feeStatus: data.feeStatus,
              });
            } else if (response.status === 403) {
              setError('You are not allowed to perform this operation.');
            } else {
              setError('Failed to fetch bus pass details.');
              console.error('Failed to fetch bus pass details:', response.statusText);
            }
          } catch (error) {
            setError('Failed to fetch bus pass details.');
            console.error('Failed to fetch bus pass details:', error);
          }
        };

        fetchBusPassDetails();
      } catch (error) {
        setError('Failed to decode token.');
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!busPassDetails) {
    return <Typography>Loading...</Typography>;
  }

  return <BusPassDetails {...busPassDetails} />;
};

export default PassDetails;
