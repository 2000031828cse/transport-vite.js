import React from 'react';

import { Outlet } from 'react-router-dom';
import UserSidebar from '../UserSidebarMenu';
import { useNavigate } from 'react-router-dom';
import { Box, CssBaseline, Button, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SidebarContext } from 'src/contexts/SidebarContext';

const UserSidebarLayout = () => {
  const navigate = useNavigate();
  const { toggleSidebar, closeSidebar } = React.useContext(SidebarContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignOut = () => {
    console.log('Sign out clicked');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'relative'
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ ml: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 }
          }}
        >
          <UserSidebar closeSidebar={handleDrawerToggle} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 }
          }}
          open
        >
          <UserSidebar closeSidebar={undefined} />
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserSidebarLayout;
