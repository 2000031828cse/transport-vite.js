import React, { useState } from 'react';
import { Button, Container, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStops } from './StopsContext';

const AddStop: React.FC = () => {
  const { addStop } = useStops();
  const navigate = useNavigate();
  const [stop, setStop] = useState({
    name: '',
    latitude: '',
    longitude: '',
    address: '',
    landmark: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    latitude: '',
    longitude: '',
    address: '',
    landmark: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStop({
      ...stop,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let tempErrors = {
      name: '',
      latitude: '',
      longitude: '',
      address: '',
      landmark: ''
    };
    let isValid = true;

    if (!stop.name) {
      tempErrors.name = 'Stop Name is required';
      isValid = false;
    }
    if (!stop.latitude) {
      tempErrors.latitude = 'Latitude is required';
      isValid = false;
    }
    if (!stop.longitude) {
      tempErrors.longitude = 'Longitude is required';
      isValid = false;
    }
    if (!stop.address) {
      tempErrors.address = 'Address is required';
      isValid = false;
    }
    if (!stop.landmark) {
      tempErrors.landmark = 'Landmark is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addStop({
      name: stop.name,
      latitude: stop.latitude,
      longitude: stop.longitude,
      address: stop.address,
      landmark: stop.landmark
    });
    navigate('/management/stops');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        p: 2,
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}
    >
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        Add New Stop
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Stop Name"
          name="name"
          value={stop.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="latitude"
          label="Latitude"
          name="latitude"
          value={stop.latitude}
          onChange={handleChange}
          error={Boolean(errors.latitude)}
          helperText={errors.latitude}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="longitude"
          label="Longitude"
          name="longitude"
          value={stop.longitude}
          onChange={handleChange}
          error={Boolean(errors.longitude)}
          helperText={errors.longitude}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          value={stop.address}
          onChange={handleChange}
          error={Boolean(errors.address)}
          helperText={errors.address}
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Stop
        </Button>
      </Box>
    </Container>
  );
};

export default AddStop;
