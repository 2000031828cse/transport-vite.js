import { Typography, Avatar, Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  const theme = useTheme();

  return (
    <Typography variant="h3" component="h3" gutterBottom>
      Welcome, {user.name}!
    </Typography>
  );
}

export default PageHeader;
