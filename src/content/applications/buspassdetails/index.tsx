import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
} from '@mui/material';

// Define the interface for bus pass details
interface BusPassDetailsProps {
  studentName: string;
  passId: string;
  approvalStatus: string;
  routeName: string;
  stopName: string;
  renewalDate: string;
  validity: string;
}

const BusPassDetails: React.FC<BusPassDetailsProps> = ({
  studentName,
  passId,
  approvalStatus,
  routeName,
  stopName,
  renewalDate,
  validity,
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
              <Typography variant="body1">{passId}</Typography>
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
                Renewal Date:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{renewalDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Validity:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">{validity}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

// Example usage of the component
const PassDetails: React.FC = () => {
  const busPassDetails = {
    studentName: 'John Doe',
    passId: 'BP12345',
    approvalStatus: 'Approved',
    routeName: 'Route 5',
    stopName: 'Central Park',
    renewalDate: '2024-12-31',
    validity: '1 Year',
  };

  return <BusPassDetails {...busPassDetails} />;
};

export default PassDetails;
