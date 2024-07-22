// // import React, { useState } from "react";
// // import { Button, Container, TextField, Box, Typography } from "@mui/material";
// // import { useNavigate } from "react-router-dom";
// // import { useVehicles } from "./VehicleContext";

// // const AddVehicle: React.FC = () => {
// //   const { addVehicle } = useVehicles();
// //   const navigate = useNavigate();
// //   const [vehicle, setVehicle] = useState({
// //     vehicleNumber: "",
// //     registrationNumber: "",
// //     driverName: "",
// //     driversLicenseNumber: "",
// //     capacity: "",
// //   });
// //   const [errors, setErrors] = useState({
// //     vehicleNumber: "",
// //     registrationNumber: "",
// //     driverName: "",
// //     driversLicenseNumber: "",
// //     capacity: "",
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setVehicle({
// //       ...vehicle,
// //       [name]: value,
// //     });
// //   };

// //   const validate = () => {
// //     const tempErrors = {
// //       vehicleNumber: "",
// //       registrationNumber: "",
// //       driverName: "",
// //       driversLicenseNumber: "",
// //       capacity: "",
// //     };
// //     let isValid = true;

// //     if (!vehicle.vehicleNumber) {
// //       tempErrors.vehicleNumber = "Vehicle Number is required";
// //       isValid = false;
// //     }
// //     if (!vehicle.registrationNumber) {
// //       tempErrors.registrationNumber = "Registration Number is required";
// //       isValid = false;
// //     }
// //     if (!vehicle.driverName) {
// //       tempErrors.driverName = "Driver Name is required";
// //       isValid = false;
// //     }
// //     if (!vehicle.driversLicenseNumber) {
// //       tempErrors.driversLicenseNumber = "Driver's License Number is required";
// //       isValid = false;
// //     }
// //     if (vehicle.capacity && isNaN(Number(vehicle.capacity))) {
// //       tempErrors.capacity = "Capacity must be a number";
// //       isValid = false;
// //     }

// //     setErrors(tempErrors);
// //     return isValid;
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!validate()) return;

// //     addVehicle({
// //       vehicleNumber: vehicle.vehicleNumber,
// //       registrationNumber: vehicle.registrationNumber,
// //       driverName: vehicle.driverName,
// //       driversLicenseNumber: vehicle.driversLicenseNumber,
// //       capacity: vehicle.capacity ? parseInt(vehicle.capacity, 10) : undefined,
// //     });
// //     navigate("/management/vehicle");
// //   };

// //   const handleCancel = () => {
// //     navigate("/management/vehicle");
// //   };

// //   return (
// //     <Container
// //       maxWidth="sm"
// //       sx={{
// //         mt: 4,
// //         p: 2,
// //         border: "1px solid #ccc",
// //         borderRadius: "8px",
// //         backgroundColor: "#ffffff",
// //       }}
// //     >
// //       <Typography variant="h5" align="center" sx={{ mb: 3 }}>
// //         Add New Vehicle
// //       </Typography>
// //       <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
// //         <TextField
// //           margin="normal"
// //           required
// //           fullWidth
// //           id="vehicleNumber"
// //           label="Vehicle Number"
// //           name="vehicleNumber"
// //           value={vehicle.vehicleNumber}
// //           onChange={handleChange}
// //           error={Boolean(errors.vehicleNumber)}
// //           helperText={errors.vehicleNumber}
// //         />
// //         <TextField
// //           margin="normal"
// //           required
// //           fullWidth
// //           id="registrationNumber"
// //           label="Registration Number"
// //           name="registrationNumber"
// //           value={vehicle.registrationNumber}
// //           onChange={handleChange}
// //           error={Boolean(errors.registrationNumber)}
// //           helperText={errors.registrationNumber}
// //         />
// //         <TextField
// //           margin="normal"
// //           required
// //           fullWidth
// //           id="driverName"
// //           label="Driver Name"
// //           name="driverName"
// //           value={vehicle.driverName}
// //           onChange={handleChange}
// //           error={Boolean(errors.driverName)}
// //           helperText={errors.driverName}
// //         />
// //         <TextField
// //           margin="normal"
// //           required
// //           fullWidth
// //           id="driversLicenseNumber"
// //           label="Driver's License Number"
// //           name="driversLicenseNumber"
// //           value={vehicle.driversLicenseNumber}
// //           onChange={handleChange}
// //           error={Boolean(errors.driversLicenseNumber)}
// //           helperText={errors.driversLicenseNumber}
// //         />
// //         <TextField
// //           margin="normal"
// //           fullWidth
// //           id="capacity"
// //           label="Capacity"
// //           name="capacity"
// //           value={vehicle.capacity}
// //           onChange={handleChange}
// //           error={Boolean(errors.capacity)}
// //           helperText={errors.capacity}
// //         />
// //         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
// //           <Button
// //             type="button"
// //             variant="outlined"
// //             color="secondary"
// //             onClick={handleCancel}
// //           >
// //             Cancel
// //           </Button>
// //           <Button type="submit" variant="contained" color="primary">
// //             Add Vehicle
// //           </Button>
// //         </Box>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default AddVehicle;

// import React, { useState } from "react";
// import { Button, Container, TextField, Box, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useVehicles } from "./VehicleContext";

// const AddVehicle: React.FC = () => {
//   const { addVehicle } = useVehicles();
//   const navigate = useNavigate();
//   const [vehicle, setVehicle] = useState({
//     vehicleNumber: "",
//     registrationNumber: "",
//     driverName: "",
//     driversLicenseNumber: "",
//     capacity: "",
//   });
//   const [errors, setErrors] = useState({
//     vehicleNumber: "",
//     registrationNumber: "",
//     driverName: "",
//     driversLicenseNumber: "",
//     capacity: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setVehicle({
//       ...vehicle,
//       [name]: value,
//     });
//   };

//   const validate = () => {
//     const tempErrors = {
//       vehicleNumber: "",
//       registrationNumber: "",
//       driverName: "",
//       driversLicenseNumber: "",
//       capacity: "",
//     };
//     let isValid = true;

//     if (!vehicle.vehicleNumber) {
//       tempErrors.vehicleNumber = "Vehicle Number is required";
//       isValid = false;
//     }
//     if (!vehicle.registrationNumber) {
//       tempErrors.registrationNumber = "Registration Number is required";
//       isValid = false;
//     }
//     if (!vehicle.driverName) {
//       tempErrors.driverName = "Driver Name is required";
//       isValid = false;
//     }
//     if (!vehicle.driversLicenseNumber) {
//       tempErrors.driversLicenseNumber = "Driver's License Number is required";
//       isValid = false;
//     }
//     if (vehicle.capacity && isNaN(Number(vehicle.capacity))) {
//       tempErrors.capacity = "Capacity must be a number";
//       isValid = false;
//     }

//     setErrors(tempErrors);
//     return isValid;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     addVehicle({
//       vehicleNumber: vehicle.vehicleNumber,
//       registrationNumber: vehicle.registrationNumber,
//       driverName: vehicle.driverName,
//       driversLicenseNumber: vehicle.driversLicenseNumber,
//       capacity: vehicle.capacity ? parseInt(vehicle.capacity, 10) : undefined,
//     });
//     navigate("/management/vehicle");
//   };

//   const handleCancel = () => {
//     navigate("/management/vehicle");
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         mt: 4,
//         p: 2,
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         backgroundColor: "#ffffff",
//       }}
//     >
//       <Typography variant="h5" align="center" sx={{ mb: 3 }}>
//         Add New Vehicle
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           id="vehicleNumber"
//           label="Vehicle Number"
//           name="vehicleNumber"
//           value={vehicle.vehicleNumber}
//           onChange={handleChange}
//           error={Boolean(errors.vehicleNumber)}
//           helperText={errors.vehicleNumber}
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           id="registrationNumber"
//           label="Registration Number"
//           name="registrationNumber"
//           value={vehicle.registrationNumber}
//           onChange={handleChange}
//           error={Boolean(errors.registrationNumber)}
//           helperText={errors.registrationNumber}
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           id="driverName"
//           label="Driver Name"
//           name="driverName"
//           value={vehicle.driverName}
//           onChange={handleChange}
//           error={Boolean(errors.driverName)}
//           helperText={errors.driverName}
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           id="driversLicenseNumber"
//           label="Driver's License Number"
//           name="driversLicenseNumber"
//           value={vehicle.driversLicenseNumber}
//           onChange={handleChange}
//           error={Boolean(errors.driversLicenseNumber)}
//           helperText={errors.driversLicenseNumber}
//         />
//         <TextField
//           margin="normal"
//           fullWidth
//           id="capacity"
//           label="Capacity"
//           name="capacity"
//           value={vehicle.capacity}
//           onChange={handleChange}
//           error={Boolean(errors.capacity)}
//           helperText={errors.capacity}
//         />
//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//           <Button
//             type="button"
//             variant="outlined"
//             color="secondary"
//             onClick={handleCancel}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" variant="contained" color="primary">
//             Add Vehicle
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default AddVehicle;

//new code

import React, { useState } from "react";
import { Button, Container, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useVehicles } from "./VehicleContext";
import { useDrivers } from "../driver/DriverContext";

const AddVehicle: React.FC = () => {
  const { addVehicle } = useVehicles();
  const { drivers } = useDrivers();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({
    vehicleNumber: "",
    registrationNumber: "",
    capacity: "",
  });
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [errors, setErrors] = useState({
    vehicleNumber: "",
    registrationNumber: "",
    capacity: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicle({
      ...vehicle,
      [name]: value,
    });
  };

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const driver = drivers.find((d) => d.id === parseInt(e.target.value, 10));
    setSelectedDriver(driver || null);
  };

  const validate = () => {
    const tempErrors = {
      vehicleNumber: "",
      registrationNumber: "",
      capacity: "",
    };
    let isValid = true;

    if (!vehicle.vehicleNumber) {
      tempErrors.vehicleNumber = "Vehicle Number is required";
      isValid = false;
    }
    if (!vehicle.registrationNumber) {
      tempErrors.registrationNumber = "Registration Number is required";
      isValid = false;
    }
    if (!selectedDriver) {
      tempErrors.capacity = "Driver selection is required";
      isValid = false;
    }
    if (vehicle.capacity && isNaN(Number(vehicle.capacity))) {
      tempErrors.capacity = "Capacity must be a number";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !selectedDriver) return;

    addVehicle({
      vehicleNumber: vehicle.vehicleNumber,
      registrationNumber: vehicle.registrationNumber,
      driverName: selectedDriver.name,
      driversLicenseNumber: selectedDriver.licenseNumber,
      capacity: vehicle.capacity ? parseInt(vehicle.capacity, 10) : undefined,
    });
    navigate("/management/vehicle");
  };

  const handleCancel = () => {
    navigate("/management/vehicle");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        Add New Vehicle
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="vehicleNumber"
          label="Vehicle Number"
          name="vehicleNumber"
          value={vehicle.vehicleNumber}
          onChange={handleChange}
          error={Boolean(errors.vehicleNumber)}
          helperText={errors.vehicleNumber}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="registrationNumber"
          label="Registration Number"
          name="registrationNumber"
          value={vehicle.registrationNumber}
          onChange={handleChange}
          error={Boolean(errors.registrationNumber)}
          helperText={errors.registrationNumber}
        />
        <TextField
          select
          label="Driver Name"
          value={selectedDriver?.id || ""}
          onChange={handleDriverChange}
          fullWidth
          margin="normal"
          required
          SelectProps={{
            native: true,
          }}
          error={Boolean(errors.capacity)}
          helperText={errors.capacity}
        >
          <option value="" disabled>
            {/* Select Driver */}
          </option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </TextField>
        <TextField
          margin="normal"
          fullWidth
          id="capacity"
          label="Capacity"
          name="capacity"
          value={vehicle.capacity}
          onChange={handleChange}
          error={Boolean(errors.capacity)}
          helperText={errors.capacity}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add Vehicle
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddVehicle;
