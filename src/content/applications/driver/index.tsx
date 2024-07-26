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
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDrivers } from "./DriverContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Drivers: React.FC = () => {
  const { drivers, deleteDriver } = useDrivers();
  const navigate = useNavigate();

  const handleAddDriver = () => {
    navigate("/management/add-driver");
  };

  const handleEditRoute = (driver: any) => {
    navigate(`/management/add-driver?edit=${driver.driverLicenseNo}`);
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
          Manage Drivers
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddDriver}>
          Add Driver
        </Button>
      </Box>

      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Driver Name</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 200, color: "#000000" }}>
                <strong>License Number</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 200, color: "#000000" }}>
                <strong>Mobile Number</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 200, color: "#000000" }}>
                <strong>Address</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>{driver.driverName}</TableCell>
                <TableCell>{driver.driverLicenseNo}</TableCell>
                <TableCell>{driver.driverMobile}</TableCell>
                <TableCell>{driver.driverAddress}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditRoute(driver)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteDriver(driver.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default Drivers;
