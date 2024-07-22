// import React from "react";
// import {
//   Button,
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Box,
//   Typography,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useVehicles } from "./VehicleContext";

// const Vehicles: React.FC = () => {
//   const { vehicles, deleteVehicle } = useVehicles();
//   const navigate = useNavigate();

//   const handleAddVehicle = () => {
//     navigate("/management/add-bus");
//   };

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         mt: 4,
//         p: 3,
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         backgroundColor: "#ffffff",
//         textAlign: "center",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "16px",
//         }}
//       >
//         <Typography variant="h5" align="left">
//           Manage Vehicles
//         </Typography>
//         <Button variant="contained" color="primary" onClick={handleAddVehicle}>
//           Add Vehicle
//         </Button>
//       </Box>

//       <Box sx={{ overflowX: "auto" }}>
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//               <TableCell sx={{ minWidth: 100, color: "#000000" }}>
//                 <strong>Vehicle Number</strong>
//               </TableCell>
//               <TableCell sx={{ minWidth: 150, color: "#000000" }}>
//                 <strong>Registration Number</strong>
//               </TableCell>
//               <TableCell sx={{ minWidth: 150, color: "#000000" }}>
//                 <strong>Driver Name</strong>
//               </TableCell>
//               <TableCell sx={{ minWidth: 200, color: "#000000" }}>
//                 <strong>Driver's License Number</strong>
//               </TableCell>
//               <TableCell sx={{ minWidth: 100, color: "#000000" }}>
//                 <strong>Capacity</strong>
//               </TableCell>
//               <TableCell sx={{ minWidth: 100, color: "#000000" }}>
//                 <strong>Actions</strong>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {vehicles.map((vehicle) => (
//               <TableRow key={vehicle.id}>
//                 <TableCell sx={{ color: "#000000" }}>
//                   {vehicle.vehicleNumber}
//                 </TableCell>
//                 <TableCell sx={{ color: "#000000" }}>
//                   {vehicle.registrationNumber}
//                 </TableCell>
//                 <TableCell sx={{ color: "#000000" }}>
//                   {vehicle.driverName}
//                 </TableCell>
//                 <TableCell sx={{ color: "#000000" }}>
//                   {vehicle.driversLicenseNumber}
//                 </TableCell>
//                 <TableCell sx={{ color: "#000000" }}>
//                   {vehicle.capacity}
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => deleteVehicle(vehicle.id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>
//     </Container>
//   );
// };

// export default Vehicles;

import React, { useState } from "react";
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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useVehicles, Vehicle, FuelLog } from "./VehicleContext";

const Vehicles: React.FC = () => {
  const { vehicles, deleteVehicle, updateVehicle, addFuelLog } = useVehicles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [fuelLog, setFuelLog] = useState<FuelLog>({
    date: "",
    quantity: 0,
    odometerReading: 0,
    cost: 0,
  });

  const handleAddVehicle = () => {
    navigate("/management/add-bus");
  };

  const handleUpdateVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setOpen(true);
  };

  const handleFuelLogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFuelLog({
      ...fuelLog,
      [name]: value,
    });
  };

  const handleAddFuelLog = (id: number) => {
    addFuelLog(id, fuelLog);
    setFuelLog({
      date: "",
      quantity: 0,
      odometerReading: 0,
      cost: 0,
    });
  };

  const handleUpdateSubmit = () => {
    if (selectedVehicle) {
      updateVehicle(selectedVehicle.id, selectedVehicle);
      setOpen(false);
    }
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedVehicle) {
      const { name, value } = e.target;
      setSelectedVehicle({
        ...selectedVehicle,
        [name]: value,
      });
    }
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
              <TableCell sx={{ minWidth: 100, color: "#000000" }}>
                <strong>Vehicle Number</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Registration Number</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Driver Name</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 200, color: "#000000" }}>
                <strong>Driver's License Number</strong>
              </TableCell>

              <TableCell sx={{ minWidth: 100, color: "#000000" }}>
                <strong>Capacity</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 100, color: "#000000" }}>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
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
                  {vehicle.driversLicenseNumber}
                </TableCell>

                <TableCell sx={{ color: "#000000" }}>
                  {vehicle.capacity}
                </TableCell>

                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleUpdateVehicle(vehicle)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteVehicle}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Vehicle</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            id="vehicleNumber"
            label="Vehicle Number"
            name="vehicleNumber"
            value={selectedVehicle?.vehicleNumber}
            onChange={handleUpdateChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="registrationNumber"
            label="Registration Number"
            name="registrationNumber"
            value={selectedVehicle?.registrationNumber}
            onChange={handleUpdateChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="driverName"
            label="Driver Name"
            name="driverName"
            value={selectedVehicle?.driverName}
            onChange={handleUpdateChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="driversLicenseNumber"
            label="Driver's License Number"
            name="driversLicenseNumber"
            value={selectedVehicle?.driversLicenseNumber}
            onChange={handleUpdateChange}
          />

          <TextField
            margin="normal"
            fullWidth
            id="capacity"
            label="Capacity"
            name="capacity"
            value={selectedVehicle?.capacity}
            onChange={handleUpdateChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Box sx={{ mt: 4 }}>
        <Typography variant="h6" align="left" sx={{ mb: 2 }}>
          Add Fuel Log
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            margin="normal"
            fullWidth
            id="date"
            label="Date"
            name="date"
            type="date"
            value={fuelLog.date}
            onChange={handleFuelLogChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="quantity"
            label="Quantity (L)"
            name="quantity"
            value={fuelLog.quantity}
            onChange={handleFuelLogChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="odometerReading"
            label="Odometer Reading"
            name="odometerReading"
            value={fuelLog.odometerReading}
            onChange={handleFuelLogChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="cost"
            label="Cost"
            name="cost"
            value={fuelLog.cost}
            onChange={handleFuelLogChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddFuelLog(selectedVehicle?.id || 0)}
          >
            Add Log
          </Button>
        </Box> 
      </Box>*/}
    </Container>
  );
};

export default Vehicles;
