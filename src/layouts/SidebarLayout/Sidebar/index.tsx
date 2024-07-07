import { useContext } from 'react';
import Scrollbar from '../../../components/Scrollbar';
import { SidebarContext } from '../../../contexts/SidebarContext';

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
  darken
} from '@mui/material';

import SidebarMenu from './SidebarMenu';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
    width: ${theme.sidebar.width};
    min-width: ${theme.sidebar.width};
    color: ${theme.colors.alpha.trueWhite[70]};
    position: relative;
    z-index: 7;
    height: 100%;
    padding-bottom: 68px;
`
);

function Sidebar({ userType }) {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background:
            theme.palette.mode === 'dark'
              ? alpha(lighten(theme.header.background, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
            theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
        }}
      >
        <Scrollbar>
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 52
              }}
            ></Box>
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img height={50} src="/static/logo/tms.svg" />
          </div>
          {/* <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10]
            }}
          /> */}
          <SidebarMenu userType={userType} />
        </Scrollbar>
        {/* <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10]
          }}
        /> */}
        <Box p={2}></Box>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5)
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52
                }}
              >
                {/* <Logo /> */}
              </Box>
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img height={100} src="/static/logo/tms.svg" />
            </div>
            <SidebarMenu userType={userType} />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
