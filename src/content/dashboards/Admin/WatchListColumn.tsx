import React from 'react';
import { Card, Box, Typography, Grid } from '@mui/material';

const WatchListColumn = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={4} xs={12}>
        <Card>
          <Box p={3}>
            <Typography variant="h1" noWrap>
              Total
            </Typography>
            <Typography variant="h2" sx={{ pt: 3 }}>
              {stats.total}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item md={4} xs={12}>
        <Card>
          <Box p={3}>
            <Typography variant="h1" noWrap>
              Approvals
            </Typography>
            <Typography variant="h2" sx={{ pt: 3 }}>
              {stats.approvals}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item md={4} xs={12}>
        <Card>
          <Box p={3}>
            <Typography variant="h1" noWrap>
              Pending
            </Typography>
            <Typography variant="h2" sx={{ pt: 3 }}>
              {stats.pending}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default WatchListColumn;
