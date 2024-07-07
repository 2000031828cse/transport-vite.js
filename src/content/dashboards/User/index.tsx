import { Helmet } from 'react-helmet-async';
import { Container, Grid, List, ListItem, Button } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import Profile from 'src/content/applications/Users/profile';

function DashboardUser() {
  return (
    <>
      <Helmet>
        <title>User Dashboard</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Profile />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default DashboardUser;
