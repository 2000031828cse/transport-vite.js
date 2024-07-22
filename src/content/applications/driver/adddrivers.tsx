import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDrivers } from "./DriverContext";

const AddDriver: React.FC = () => {
  const { addDriver } = useDrivers();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDriver({ id: Date.now(), name, phoneNumber, licenseNumber, address });
    navigate("/management/driver");
  };

  const handleCancel = () => {
    navigate("/management/driver");
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
        textAlign: "center",
      }}
    >
      <Typography variant="h5" align="left" sx={{ mb: 3 }}>
        Add New Driver
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="License Number"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Add Driver
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddDriver;
