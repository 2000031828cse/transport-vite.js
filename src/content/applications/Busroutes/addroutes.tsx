import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useStops } from "../Stops/StopsContext";
import { useBusRoutes } from "./BusRoutesContext";
import { useVehicles } from "../Vehicle/VehicleContext";
import { Stop } from "./stops"; // Correct the import path if necessary

const AddRoute: React.FC = () => {
  const { stops } = useStops();
  const { addRoute, updateRoute, routes } = useBusRoutes();
  const { vehicles } = useVehicles();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const editId = searchParams.get("edit");

  const initialRoute = {
    id: routes.length + 1,
    name: "",
    timings: "",
    stops: [],
    buses: [], // Add this line to include buses
  };

  const [newRoute, setNewRoute] = useState(initialRoute);
  const [selectedStops, setSelectedStops] = useState<Stop[]>([]);
  const [selectedBusId, setSelectedBusId] = useState<number | "">("");
  const [errors, setErrors] = useState({
    name: false,
    timings: false,
    stops: false,
  });

  useEffect(() => {
    if (editId) {
      const routeToEdit = routes.find((route) => route.id === parseInt(editId));
      if (routeToEdit) {
        setNewRoute(routeToEdit);
        setSelectedStops(routeToEdit.stops);
        setSelectedBusId(
          routeToEdit.buses.length > 0 ? routeToEdit.buses[0].id : ""
        );
      }
    }
  }, [editId, routes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRoute({ ...newRoute, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleStopChange = (
    index: number,
    event: SelectChangeEvent<number>
  ) => {
    const stopId = event.target.value as number;
    const newSelectedStops = [...selectedStops];
    const stop = stops.find((s) => s.id === stopId);

    if (stop && !newSelectedStops.some((s) => s.id === stopId)) {
      newSelectedStops[index] = stop;
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

  const addNewStopField = () => {
    setSelectedStops([...selectedStops, { id: 0, address: "" }]);
  };

  const handleBusChange = (event: SelectChangeEvent<number>) => {
    const busId = event.target.value as number;
    setSelectedBusId(busId);
    const selectedBus = vehicles.find((bus) => bus.id === busId);
    if (selectedBus) {
      setNewRoute({ ...newRoute, buses: [selectedBus] });
    }
  };

  const validateForm = () => {
    let valid = true;
    const currentErrors = {
      name: false,
      timings: false,
      stops: false,
    };
    if (!newRoute.name) {
      currentErrors.name = true;
      valid = false;
    }
    if (!newRoute.timings) {
      currentErrors.timings = true;
      valid = false;
    }
    if (selectedStops.length === 0 || selectedStops.some((stop) => !stop.id)) {
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
      stops: selectedStops.filter((stop) => stop.id !== 0), // Filter out placeholders
    };

    if (editId) {
      updateRoute(updatedRoute);
    } else {
      addRoute(updatedRoute);
    }

    navigate("/management/busstages");
  };

  const handleCancel = () => {
    navigate("/management/busstages");
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h6">
        {editId ? "Edit Route" : "Add Route"}
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: "8px" }}>
        <TextField
          error={errors.name}
          helperText={errors.name ? "Route Name is required" : ""}
          label="Route Name"
          variant="outlined"
          name="name"
          value={newRoute.name}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: "8px" }}
        />
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: "8px" }}>
        <TextField
          error={errors.timings}
          helperText={errors.timings ? "Timings are required" : ""}
          label="Timings"
          variant="outlined"
          name="timings"
          value={newRoute.timings}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: "8px" }}
        />
      </FormControl>
      <Typography variant="body1">Stops:</Typography>
      {selectedStops.map((stop, index) => (
        <FormControl fullWidth key={index} sx={{ marginBottom: "8px" }}>
          <Select
            value={stop.id}
            onChange={(event) => handleStopChange(index, event)}
            displayEmpty
            renderValue={(selected) =>
              selected === 0 ? (
                <Typography color="textSecondary">Select Stop</Typography>
              ) : (
                stops.find((s) => s.id === selected)?.address
              )
            }
            fullWidth
          >
            <MenuItem disabled value={0}>
              <em>Select Stop</em>
            </MenuItem>
            {stops.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.address}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteStop(index)}
            sx={{ marginTop: "8px" }}
          >
            Remove Stop
          </Button>
        </FormControl>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={addNewStopField}
        sx={{ marginBottom: "16px" }}
      >
        Add Stop
      </Button>
      {errors.stops && (
        <Typography color="error" variant="body2">
          At least one valid stop is required
        </Typography>
      )}
      <FormControl fullWidth sx={{ marginBottom: "8px" }}>
        <InputLabel>Bus</InputLabel>
        <Select
          value={selectedBusId}
          onChange={handleBusChange}
          displayEmpty
          fullWidth
        >
          <MenuItem disabled value="">
            <em>Select Bus</em>
          </MenuItem>
          {vehicles.map((bus) => (
            <MenuItem key={bus.id} value={bus.id}>
              {bus.busName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedBusId && (
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="body2">
            Bus Name: {newRoute.buses[0]?.busName}
          </Typography>
          <Typography variant="body2">
            Driver Name: {newRoute.buses[0]?.driverName}
          </Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleCancel}
          sx={{ marginRight: "8px" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddOrUpdateRoute}
        >
          {editId ? "Update Route" : "Add Route"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddRoute;
