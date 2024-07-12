import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { useBusRoutes } from "src/content/applications/Busroutes/BusRoutesContext";

const UserBusRoutes: React.FC = () => {
  const { routes, fetchRoutes } = useBusRoutes();

  useEffect(() => {
    fetchRoutes(); // Fetch routes when component mounts
  }, []);

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
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Typography variant="h6">Bus Routes</Typography>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="bus routes table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ color: "#000000" }}>S.No</TableCell>
              <TableCell sx={{ color: "#000000" }}>Route Name</TableCell>
              <TableCell sx={{ color: "#000000" }}>Timings</TableCell>
              <TableCell sx={{ color: "#000000" }}>Stops</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id}>
                <TableCell sx={{ color: "#000000" }}>{route.id}</TableCell>
                <TableCell sx={{ color: "#000000" }}>{route.name}</TableCell>
                <TableCell sx={{ color: "#000000" }}>{route.timings}</TableCell>
                <TableCell sx={{ color: "#000000" }}>
                  {route && route.stops && Array.isArray(route.stops) ? (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserBusRoutes;