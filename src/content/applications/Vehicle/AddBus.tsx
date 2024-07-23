import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useVehicles } from "./VehicleContext";
import { useDrivers } from "../driver/DriverContext";

const AddVehicle: React.FC = () => {
  const { addVehicle } = useVehicles();
  const { drivers } = useDrivers();
  const navigate = useNavigate();

  const [busName, setBusName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverLicenseNumber, setDriverLicenseNumber] = useState("");
  const [busType, setBusType] = useState("");
  const [busCapacity, setBusCapacity] = useState(0);
  const [busModel, setBusModel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVehicle({
      busName,
      vehicleNumber,
      registrationNumber,
      driverName,
      driverLicenseNumber,
      busType,
      busCapacity,
      busModel,
    });
    navigate("/management/vehicle");
  };

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDriver = drivers.find(
      (driver) => driver.driverName === e.target.value
    );
    setDriverName(e.target.value);
    setDriverLicenseNumber(
      selectedDriver ? selectedDriver.driverLicenseNo : ""
    );
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Add New Vehicle
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <TextField
          label="Bus Name"
          value={busName}
          onChange={(e) => setBusName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          fullWidth
        />
        <TextField
          label="Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Driver Name"
          value={driverName}
          onChange={handleDriverChange}
          fullWidth
        >
          {drivers.map((driver) => (
            <MenuItem key={driver.id} value={driver.driverName}>
              {driver.driverName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Driver License Number"
          value={driverLicenseNumber}
          onChange={(e) => setDriverLicenseNumber(e.target.value)}
          fullWidth
          disabled
        />
        <TextField
          label="Bus Type"
          value={busType}
          onChange={(e) => setBusType(e.target.value)}
          fullWidth
        />
        <TextField
          label="Bus Capacity"
          type="number"
          value={busCapacity}
          onChange={(e) => setBusCapacity(Number(e.target.value))}
          fullWidth
        />
        <TextField
          label="Bus Model"
          value={busModel}
          onChange={(e) => setBusModel(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Add Vehicle
        </Button>
      </Box>
    </Container>
  );
};

export default AddVehicle;
