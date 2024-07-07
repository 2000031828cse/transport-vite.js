import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  SelectChangeEvent
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStops } from '../Stops/StopsContext';
import { useBusRoutes } from './BusRoutesContext';

const AddRoute: React.FC = () => {
  const { stops } = useStops();
  const { addRoute, updateRoute, routes } = useBusRoutes();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const editSno = searchParams.get('edit');

  const initialRoute = {
    sno: routes.length + 1,
    location: '',
    routeName: '',
    timings: '',

    stops: []
  };

  const [newRoute, setNewRoute] = useState(initialRoute);
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    routeName: false,
    timings: false,

    stops: false
  });

  useEffect(() => {
    if (editSno) {
      const routeToEdit = routes.find(
        (route) => route.sno === parseInt(editSno)
      );
      if (routeToEdit) {
        setNewRoute(routeToEdit);
        setSelectedStops(routeToEdit.stops);
      }
    }
  }, [editSno, routes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRoute({ ...newRoute, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleStopChange = (
    index: number,
    event: SelectChangeEvent<string>
  ) => {
    const value = event.target.value as string;
    const newSelectedStops = [...selectedStops];

    if (!newSelectedStops.includes(value)) {
      newSelectedStops[index] = value;
      setSelectedStops(newSelectedStops);
      setNewRoute({ ...newRoute, stops: newSelectedStops });
      setErrors({ ...errors, stops: false });
    }
  };

  const handleDeleteStop = (index: number) => {
    const newSelectedStops = selectedStops.filter((_, i) => i !== index);
    setSelectedStops(newSelectedStops);
    setNewRoute({ ...newRoute, stops: newSelectedStops });
  };

  const addNewStopField = (index: number | null = null) => {
    const newSelectedStops = [...selectedStops];
    if (index === null) {
      newSelectedStops.push('');
    } else {
      newSelectedStops.splice(index + 1, 0, '');
    }
    setSelectedStops(newSelectedStops);
  };

  const validateForm = () => {
    let valid = true;
    const currentErrors = {
      routeName: false,
      timings: false,

      stops: false
    };
    if (!newRoute.routeName) {
      currentErrors.routeName = true;
      valid = false;
    }
    if (!newRoute.timings) {
      currentErrors.timings = true;
      valid = false;
    }

    if (selectedStops.length === 0 || selectedStops.some((stop) => !stop)) {
      currentErrors.stops = true;
      valid = false;
    }

    setErrors(currentErrors);
    return valid;
  };

  const handleAddOrUpdateRoute = () => {
    if (!validateForm()) {
      return;
    }

    const updatedRoute = {
      ...newRoute,
      stops: selectedStops.filter((stop) => stop)
    };
    if (editSno) {
      updateRoute(updatedRoute);
    } else {
      addRoute(updatedRoute);
    }
    navigate('/management/busstages');
  };

  const handleCancel = () => {
    navigate('/management/busstages');
  };

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h6">
        {editSno ? 'Edit Route' : 'Add Route'}
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: '8px' }}>
        <TextField
          error={errors.routeName}
          helperText={errors.routeName ? 'Route Name is required' : ''}
          label="Route Name"
          variant="outlined"
          name="routeName"
          value={newRoute.routeName}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: '8px' }}
        />
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '8px' }}>
        <TextField
          error={errors.timings}
          helperText={errors.timings ? 'Timings are required' : ''}
          label="Timings"
          variant="outlined"
          name="timings"
          value={newRoute.timings}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: '8px' }}
        />
      </FormControl>
      <Typography variant="body1" sx={{ marginBottom: '8px' }}>
        Stops
      </Typography>
      {selectedStops.map((stop, index) => (
        <Box
          key={index}
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
        >
          <FormControl fullWidth sx={{ flex: 1, marginRight: '8px' }}>
            <InputLabel id={`stop-label-${index}`}>Stop {index + 1}</InputLabel>
            <Select
              error={errors.stops && !stop}
              labelId={`stop-label-${index}`}
              value={stop}
              onChange={(event) =>
                handleStopChange(index, event as SelectChangeEvent<string>)
              }
              fullWidth
            >
              {stops
                .filter(
                  (s) => !selectedStops.includes(s.name) || s.name === stop
                )
                .map((filteredStop) => (
                  <MenuItem key={filteredStop.number} value={filteredStop.name}>
                    {filteredStop.number}. {filteredStop.name}
                  </MenuItem>
                ))}
            </Select>
            {errors.stops && !stop && (
              <Typography
                variant="caption"
                color="error"
                sx={{ marginTop: '4px' }}
              >
                Stop is required
              </Typography>
            )}
          </FormControl>
          <Button
            variant="outlined"
            onClick={() => handleDeleteStop(index)}
            color="error"
          >
            Delete
          </Button>
          <Button
            onClick={() => addNewStopField(index)}
            sx={{
              fontSize: '24px',
              color: '#000000',
              marginLeft: '8px'
            }}
          >
            +
          </Button>
        </Box>
      ))}
      <Button
        onClick={() => addNewStopField(null)}
        sx={{
          fontSize: '30px',
          color: '#000000',
          marginBottom: '8px'
        }}
      >
        +
      </Button>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '8px'
        }}
      >
        <Button
          onClick={handleAddOrUpdateRoute}
          sx={{
            backgroundColor: '#000000',
            color: '#ffffff',
            marginRight: '8px'
          }}
        >
          {editSno ? 'Update Route' : 'Add Route'}
        </Button>
        <Button
          onClick={handleCancel}
          sx={{
            backgroundColor: '#000000',
            color: '#ffffff'
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddRoute;
