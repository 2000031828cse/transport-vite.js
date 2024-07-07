import React from 'react';
import { Card, Box, Typography, Grid } from '@mui/material';

function WatchListColumn() {
  return (
    <Grid
      container
      spacing={3} // Adjusted spacing to match StudentTable
    >
      <Grid item md={4} xs={10}>
        <Card>
          <Box p={3}>
            <Typography variant="h1" noWrap>
              Total
            </Typography>
            <Typography variant="h2" sx={{ pt: 3 }}>
              5000
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item md={4} xs={10}>
        <Card>
          <Box p={3}>
            <Typography variant="h1" noWrap>
              Approvals
            </Typography>
            <Typography variant="h2" sx={{ pt: 3 }}>
              2500
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item md={4} xs={10}>
        <Card>
          <Box p={3}>
            <Typography variant="h1" noWrap>
              Pending
            </Typography>
            <Typography variant="h2" sx={{ pt: 3 }}>
              2000
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default WatchListColumn;
