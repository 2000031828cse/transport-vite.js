import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useStops } from "./StopsContext";

const AddStop: React.FC = () => {
  const { addStop, editStop } = useStops();
  const navigate = useNavigate();
  const location = useLocation();
  const stopToEdit = location.state?.stop;

  const [stop, setStop] = useState({
    address: stopToEdit?.address || "",
    lat: stopToEdit?.lat || "",
    lng: stopToEdit?.lng || "",
    landmark: stopToEdit?.landmark || "",
    pickUp: stopToEdit?.pickUp || "",
    dropTime: stopToEdit?.dropTime || "",
  });
  const [errors, setErrors] = useState({
    address: "",
    lat: "",
    lng: "",
    landmark: "",
    pickUp: "",
    dropTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStop({
      ...stop,
      [name]: value,
    });
  };

  const validate = () => {
    const tempErrors = {
      address: "",
      lat: "",
      lng: "",
      landmark: "",
      pickUp: "",
      dropTime: "",
    };
    let isValid = true;

    if (!stop.address) {
      tempErrors.address = "Stop Address is required";
      isValid = false;
    }
    if (stop.lat && isNaN(Number(stop.lat))) {
      tempErrors.lat = "Latitude must be a number";
      isValid = false;
    }
    if (stop.lng && isNaN(Number(stop.lng))) {
      tempErrors.lng = "Longitude must be a number";
      isValid = false;
    }
    if (!stop.landmark) {
      tempErrors.landmark = "Landmark is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (stopToEdit) {
      editStop(stopToEdit.id, {
        address: stop.address,
        lat: stop.lat ? parseFloat(stop.lat) : undefined,
        lng: stop.lng ? parseFloat(stop.lng) : undefined,
        landmark: stop.landmark,
        pickUp: stop.pickUp,
        dropTime: stop.dropTime,
      });
    } else {
      addStop({
        address: stop.address,
        lat: stop.lat ? parseFloat(stop.lat) : undefined,
        lng: stop.lng ? parseFloat(stop.lng) : undefined,
        landmark: stop.landmark,
        pickUp: stop.pickUp,
        dropTime: stop.dropTime,
      });
    }
    navigate("/management/stops");
  };

  const handleCancel = () => {
    navigate("/management/stops");
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
        {stopToEdit ? "Edit Stop" : "Add New Stop"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Stop Address"
          name="address"
          value={stop.address}
          onChange={handleChange}
          error={Boolean(errors.address)}
          helperText={errors.address}
        />
        <TextField
          margin="normal"
          fullWidth
          id="lat"
          label="Latitude"
          name="lat"
          value={stop.lat}
          onChange={handleChange}
          error={Boolean(errors.lat)}
          helperText={errors.lat}
        />
        <TextField
          margin="normal"
          fullWidth
          id="lng"
          label="Longitude"
          name="lng"
          value={stop.lng}
          onChange={handleChange}
          error={Boolean(errors.lng)}
          helperText={errors.lng}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="landmark"
          label="Landmark"
          name="landmark"
          value={stop.landmark}
          onChange={handleChange}
          error={Boolean(errors.landmark)}
          helperText={errors.landmark}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="pickUp"
          label="Pick Up Time"
          name="pickUp"
          value={stop.pickUp}
          onChange={handleChange}
          error={Boolean(errors.pickUp)}
          helperText={errors.pickUp}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="dropTime"
          label="Drop Time"
          name="dropTime"
          value={stop.dropTime}
          onChange={handleChange}
          error={Boolean(errors.dropTime)}
          helperText={errors.dropTime}
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
            {stopToEdit ? "Update Stop" : "Add Stop"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddStop;
