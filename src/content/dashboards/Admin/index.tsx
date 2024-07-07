import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import WatchList from './WatchList';
import StudentTable from './StudentTable';

function DashboardAdmin() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
          <Grid item xs={12}>
            <StudentTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DashboardAdmin;
