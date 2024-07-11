// import React from 'react';
// import {
//   Container,
//   Typography,
//   Paper,
//   Box,
//   Grid,
// } from '@mui/material';

// // Define the interface for bus pass details
// interface BusPassDetailsProps {
//   studentName: string;
//   passId: string;
//   approvalStatus: string;
//   routeName: string;
//   stopName: string;
//   renewalDate: string;
//   validity: string;
// }

// const BusPassDetails: React.FC<BusPassDetailsProps> = ({
//   studentName,
//   passId,
//   approvalStatus,
//   routeName,
//   stopName,
//   renewalDate,
//   validity,
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
//               <Typography variant="body1">{studentName}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Pass ID:
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">{passId}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Approval Status:
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">{approvalStatus}</Typography>
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
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Renewal Date:
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">{renewalDate}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Validity:
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">{validity}</Typography>
//             </Grid>
//           </Grid>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// // Example usage of the component
// const PassDetails: React.FC = () => {
//   const busPassDetails = {
//     studentName: 'John Doe',
//     passId: 'BP12345',
//     approvalStatus: 'Approved',
//     routeName: 'Route 5',
//     stopName: 'Central Park',
//     renewalDate: '2024-12-31',
//     validity: '1 Year',
//   };

//   return <BusPassDetails {...busPassDetails} />;
// };

// export default PassDetails;
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';

// Define the interface for bus pass details based on API response
interface BusPassDetails {
  student: {
    name: string;
  };
  buspassId: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'active';
  assignedStop: string | null;
  requestStopName: string | null;
  renewalStatus: boolean;
  feeStatus: boolean;
  routeId: number | null;
  routeName: string | null;
}

// Define the BusPassDetailsProps interface for the component
interface BusPassDetailsProps {
  studentName: string;
  passId: string;
  approvalStatus: string;
  routeName: string;
  stopName: string;
  renewalStatus: boolean;
  feeStatus: boolean;
}

const BusPassDetailsComponent: React.FC<BusPassDetailsProps> = ({
  studentName,
  passId,
  approvalStatus,
  routeName,
  stopName,
  renewalStatus,
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
              <Typography variant="body1">{studentName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Pass ID:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{passId || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Approval Status:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{approvalStatus}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Route Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{routeName || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Stop Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{stopName || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Renewal Status:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{renewalStatus ? 'Renewed' : 'Not Renewed'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Fee Status:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{feeStatus ? 'Paid' : 'Not Paid'}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

const PassDetails: React.FC = () => {
  const [busPassDetails, setBusPassDetails] = useState<BusPassDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with the actual bus pass ID or fetch it as needed
  const buspassId = 1;
  const otpt = sessionStorage.getItem("otptoken");

  useEffect(() => {
    const fetchBusPassDetails = async () => {
      try {
        const response = await fetch(
          `/v2/api/transport/buspasses/${buspassId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${otpt}`,
            },
          }
        );

        if (!response.ok) {
          const responseBody = await response.json();
          throw new Error(`Error fetching bus pass details: ${response.statusText} - ${responseBody.message}`);
        }

        const data: BusPassDetails = await response.json();
        setBusPassDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBusPassDetails();
  }, [buspassId]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!busPassDetails) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h6">No bus pass details available</Typography>
      </Container>
    );
  }

  return (
    <BusPassDetailsComponent
      studentName={busPassDetails.student.name}
      passId={busPassDetails.buspassId || 'N/A'}
      approvalStatus={busPassDetails.status}
      routeName={busPassDetails.routeName || 'N/A'}
      stopName={busPassDetails.assignedStop || 'N/A'}
      renewalStatus={busPassDetails.renewalStatus}
      feeStatus={busPassDetails.feeStatus}
    />
  );
};

export default PassDetails;

