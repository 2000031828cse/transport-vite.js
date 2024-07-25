import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  IconButton,
  Container,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useBusRoutes } from "./BusRoutesContext";

const BusRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { routes, fetchRoutes, deleteRoute } = useBusRoutes();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchRoutes();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAddRouteClick = () => {
    navigate("/management/addroutes");
  };

  const handleEditRoute = (route: any) => {
    navigate(`/management/addroutes?edit=${route.id}`);
  };

  const handleDeleteRoute = (id: number) => {
    deleteRoute(id);
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        p: 2,
        border: "1px solid #ccc",
        backgroundColor: "#ffffff",
        color: "#000000",
        marginBottom: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Typography variant="h5">Bus Routes</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRouteClick}
        >
          Add Route
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="bus routes table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ color: "#000000" }}>S.No</TableCell>
              <TableCell sx={{ color: "#000000" }}>Route Name</TableCell>
              <TableCell sx={{ color: "#000000" }}>Timings</TableCell>
              <TableCell sx={{ color: "#000000" }}>Stops</TableCell>
              <TableCell sx={{ color: "#000000" }}>Bus Name</TableCell>
              <TableCell sx={{ color: "#000000" }}>Driver Name</TableCell>
              <TableCell sx={{ color: "#000000" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography>No routes available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell sx={{ color: "#000000" }}>{route.id}</TableCell>
                  <TableCell sx={{ color: "#000000" }}>{route.name}</TableCell>
                  <TableCell sx={{ color: "#000000" }}>
                    {route.timings}
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }}>
                    {route.stops && Array.isArray(route.stops) ? (
                      route.stops.map((stop, index) => (
                        <span key={index}>
                          {stop.address}{" "}
                          {index < route.stops.length - 1 ? " - " : ""}
                        </span>
                      ))
                    ) : (
                      <span>No stops available</span>
                    )}
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }}>
                    {route.buses && route.buses.length > 0
                      ? route.buses[0].busName
                      : "No bus assigned"}
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }}>
                    {route.buses && route.buses.length > 0
                      ? route.buses[0].driver.driverName
                      : "No driver assigned"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditRoute(route)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteRoute(route.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BusRoutes;
