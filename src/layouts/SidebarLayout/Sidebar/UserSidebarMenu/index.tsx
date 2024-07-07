import React, { useContext } from 'react';
import { List, ListItem, Button, styled, Box, alpha } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';

import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
    width: 250px;
    height: 100vh; /* 100% viewport height */
    background: black;
    color: white;
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* Enable vertical scrolling if content exceeds height */

    .MuiList-root {
      flex-grow: 1; /* Grow to fill remaining space */
      padding: ${theme.spacing(1)};
      .MuiListItem-root {
        padding: 0;
        .MuiButton-root {
          justify-content: flex-start;
          padding: ${theme.spacing(1.25, 2)};
          width: 100%;
          color: white;
          border-radius: ${theme.shape.borderRadius}px;
          text-transform: none;
          .MuiButton-startIcon {
            color: white;
            font-size: 20px;
            margin-right: ${theme.spacing(1)};
          }
        }
        .MuiButton-root:hover {
          background: ${alpha(theme.palette.common.white, 0.1)};
          color: white;
        }
        &.active .MuiButton-root {
          background: ${alpha(theme.palette.common.white, 0.2)};
          color: white;
        }
      }
    }
  `
);

const UserSidebar = ({ closeSidebar }) => {
  const { closeSidebar: contextCloseSidebar } = useContext(SidebarContext);

  const handleClose = () => {
    if (closeSidebar) {
      closeSidebar();
    }
    if (contextCloseSidebar) {
      contextCloseSidebar();
    }
  };

  return (
    <MenuWrapper>
      <List component="nav">
        <ListItem component="div" disablePadding>
          <Button
            disableRipple
            component={RouterLink}
            onClick={handleClose}
            to="/dashboards/user"
            startIcon={<BrightnessLowTwoToneIcon />}
          >
            Dashboard
          </Button>
        </ListItem>
        <ListItem component="div" disablePadding>
          <Button
            disableRipple
            component={RouterLink}
            onClick={handleClose}
            to="/dashboards/profile"
            startIcon={<AccountCircleTwoToneIcon />}
          >
            Profile
          </Button>
        </ListItem>
        <ListItem component="div" disablePadding>
          <Button
            disableRipple
            component={RouterLink}
            onClick={handleClose}
            to="/routes"
            startIcon={<MmsTwoToneIcon />}
          >
            Routes
          </Button>
        </ListItem>
        <ListItem component="div" disablePadding>
          <Button
            disableRipple
            component={RouterLink}
            onClick={handleClose}
            to="/dashboards/buspassdetails"
            startIcon={<MmsTwoToneIcon />}
          >
            Bus Pass Details
          </Button>
        </ListItem>
        <ListItem component="div" disablePadding>
          <Button
            disableRipple
            component={RouterLink}
            onClick={handleClose}
            to="/dashboards/buspassrequest"
            startIcon={<RedeemTwoToneIcon />}
          >
            Bus Pass Request
          </Button>
        </ListItem>
      </List>
    </MenuWrapper>
  );
};

export default UserSidebar;
