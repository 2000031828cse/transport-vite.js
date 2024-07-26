import { useContext } from "react";
import { List, Box, ListItem, styled, Button, alpha } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { SidebarContext } from "../../../../contexts/SidebarContext";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RouteIcon from "@mui/icons-material/Route";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};
  }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    .MuiListItem-root {
      padding: 1px 0;

      .MuiButton-root {
        display: flex;
        color: ${theme.colors.alpha.trueWhite[70]};
        background-color: transparent;
        width: 100%;
        justify-content: flex-start;
        padding: ${theme.spacing(1.2, 3)};

        .MuiButton-startIcon {
          color: ${theme.colors.alpha.trueWhite[30]};
          font-size: ${theme.typography.pxToRem(20)};
          margin-right: ${theme.spacing(1)};
        }

        &.active,
        &:hover {
          background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
          color: ${theme.colors.alpha.trueWhite[100]};
          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[100]};
          }
        }
      }
    }
  }
`
);

function SidebarMenu({ userType }) {
  const { closeSidebar } = useContext(SidebarContext);

  const adminItems = [
    { to: "/dashboards/Admin", icon: <DashboardIcon />, label: "Dashboard" },
    { to: "/management/termpage", icon: <CalendarMonthIcon />, label: "Term" },
    {
      to: "/management/PassRequesteddetails",
      icon: <DirectionsBusIcon />,
      label: "Bus pass requests",
    },
    { to: "/management/stops", icon: <PlaceIcon />, label: "Stops" },
    { to: "/management/busstages", icon: <RouteIcon />, label: "Routes" },
    // {
    //   to: "/management/createuser",
    //   icon: <PersonAddIcon />,
    //   label: "Create User",
    // },
    {
      to: "/management/driver",
      icon: <PersonAddIcon />,
      label: "Drivers",
    },
    {
      to: "/management/vehicle",
      icon: <AirportShuttleIcon />,
      label: "Vehicle",
    }, // Add the new menu item here
  ];

  const userItems = [
    { to: "/dashboards/User", icon: <DashboardIcon />, label: "Dashboard" },
    {
      to: "/dashboards/profile",
      icon: <AccountCircleIcon />,
      label: "Profile",
    },
    { to: "/dashboards/routes", icon: <RouteIcon />, label: "Routes" },
    {
      to: "/dashboards/buspassdetails",
      icon: <ListAltIcon />,
      label: "Bus pass details",
    },
    {
      to: "/dashboards/buspassrequest",
      icon: <DirectionsBusIcon />,
      label: "Bus pass request",
    },
  ];

  const menuItems = userType === "admin" ? adminItems : userItems;

  return (
    <MenuWrapper>
      <List component="div">
        <SubMenuWrapper>
          <List component="div">
            {menuItems.map((item) => (
              <ListItem component="div" key={item.to}>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to={item.to}
                  startIcon={item.icon}
                >
                  {item.label}
                </Button>
              </ListItem>
            ))}
          </List>
        </SubMenuWrapper>
      </List>
    </MenuWrapper>
  );
}

export default SidebarMenu;
