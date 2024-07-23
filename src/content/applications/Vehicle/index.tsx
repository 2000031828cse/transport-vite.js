import React from "react";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useVehicles } from "./VehicleContext";

const Vehicles: React.FC = () => {
  const { vehicles, deleteVehicle } = useVehicles();
  const navigate = useNavigate();

  const handleAddVehicle = () => {
    navigate("/management/add-bus");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        textAlign: "center",
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
        <Typography variant="h5" align="left">
          Manage Vehicles
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddVehicle}>
          Add Vehicle
        </Button>
      </Box>

      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Bus Name</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Vehicle Number</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 200, color: "#000000" }}>
                <strong>Registration Number</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Driver Name</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 200, color: "#000000" }}>
                <strong>Driver License Number</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Bus Type</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Bus Capacity</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Bus Model</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell sx={{ color: "#000000" }}>
                  {vehicle.busName}
                </TableCell>
                <TableCell sx={{ color: "#000000" }}>
                  {vehicle.vehicleNumber}
                </TableCell>
                <TableCell sx={{ color: "#000000" }}>
                  {vehicle.registrationNumber}
                </TableCell>
                <TableCell sx={{ color: "#000000" }}>
                  {vehicle.driverName}
                </TableCell>
                <TableCell sx={{ color: "#000000" }}>
                  {vehicle.driverLicenseNumber}
                </TableCell>
                <TableCell sx={{ color: "#000000" }}>
                  {vehicle.busType}
                </TableCell>
                <TableCell sx={{ color: "#000000" }}>
                  {vehicle.busCapacity}
                </TableCell>
                <TableCell sx={{ color: "#000000" }}>
                  {vehicle.busModel}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteVehicle(vehicle.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default Vehicles;
