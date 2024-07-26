import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDrivers } from "./DriverContext";

const AddDriver: React.FC = () => {
  const { addDriver, updateDriver, drivers } = useDrivers();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editLicenseNo = queryParams.get("edit");

  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");
  const [driverLicenseNo, setDriverLicenseNo] = useState("");
  const [driverAddress, setDriverAddress] = useState("");

  useEffect(() => {
    if (editLicenseNo) {
      const driver = drivers.find((d) => d.driverLicenseNo === editLicenseNo);
      if (driver) {
        setDriverName(driver.driverName);
        setDriverMobile(driver.driverMobile);
        setDriverLicenseNo(driver.driverLicenseNo);
        setDriverAddress(driver.driverAddress);
      }
    }
  }, [editLicenseNo, drivers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const driverData = { driverName, driverMobile, driverAddress };

    if (editLicenseNo) {
      updateDriver(driverLicenseNo, driverData);
    } else {
      addDriver({ driverName, driverMobile, driverLicenseNo, driverAddress });
    }

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
        {editLicenseNo ? "Edit Driver" : "Add New Driver"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone Number"
          value={driverMobile}
          onChange={(e) => setDriverMobile(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="License Number"
          value={driverLicenseNo}
          onChange={(e) => setDriverLicenseNo(e.target.value)}
          fullWidth
          margin="normal"
          required
          disabled={!!editLicenseNo}
        />
        <TextField
          label="Address"
          value={driverAddress}
          onChange={(e) => setDriverAddress(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            {editLicenseNo ? "Update Driver" : "Add Driver"}
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
