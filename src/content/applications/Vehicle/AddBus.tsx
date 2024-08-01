import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useVehicles } from "./VehicleContext";
import { useDrivers } from "../driver/DriverContext";

const AddVehicle: React.FC = () => {
  const { addVehicle, editVehicle } = useVehicles();
  const { drivers } = useDrivers();
  const navigate = useNavigate();
  const location = useLocation();
  const vehicleToEdit = location.state?.vehicle;

  const [busName, setBusName] = useState(vehicleToEdit?.busName || "");
  const [vehicleNumber, setVehicleNumber] = useState(
    vehicleToEdit?.vehicleNumber || ""
  );
  const [registrationNumber, setRegistrationNumber] = useState(
    vehicleToEdit?.registrationNumber || ""
  );
  const [driverName, setDriverName] = useState(vehicleToEdit?.driverName || "");
  const [driverLicenseNumber, setDriverLicenseNumber] = useState(
    vehicleToEdit?.driverLicenseNumber || ""
  );
  const [busType, setBusType] = useState(vehicleToEdit?.busType || "");
  const [busCapacity, setBusCapacity] = useState(
    vehicleToEdit?.busCapacity || ""
  );
  const [busModel, setBusModel] = useState(vehicleToEdit?.busModel || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicleToEdit) {
      editVehicle(vehicleToEdit.id, {
        busName,
        vehicleNumber,
        registrationNumber,
        driverName,
        driverLicenseNumber,
        busType,
        busCapacity,
        busModel,
      });
    } else {
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
    }
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

  const handleCancel = () => {
    navigate("/management/vehicle");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 3,
        p: 1,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        {vehicleToEdit ? "Edit Vehicle" : "Add New Vehicle"}
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            {vehicleToEdit ? "Update Vehicle" : "Add Vehicle"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddVehicle;
