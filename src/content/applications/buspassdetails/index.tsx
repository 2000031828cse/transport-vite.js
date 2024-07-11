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

// Define the structure of the bus pass details based on API response
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

// Define the UserProfile component
const UserProfile: React.FC = () => {
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
          `/v2/api/transport/buspasses/${buspassId}`, // Correct URL with base
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${otpt}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching bus pass details: ${response.statusText}`);
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
  }, [buspassId, otpt]);

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
              <Typography variant="body1">{busPassDetails.student.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Pass ID:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{busPassDetails.buspassId || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Approval Status:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{busPassDetails.status}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Route Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{busPassDetails.routeName || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Stop Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{busPassDetails.assignedStop || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Renewal Status:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{busPassDetails.renewalStatus ? 'Renewed' : 'Not Renewed'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Fee Status:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{busPassDetails.feeStatus ? 'Paid' : 'Not Paid'}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfile;
