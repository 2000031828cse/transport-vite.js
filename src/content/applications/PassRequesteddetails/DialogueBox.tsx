import React, { FC, useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PassOrder } from "src/models/pass_request";
import { useStops } from "../Stops/StopsContext";

interface ApprovalDialogProps {
  open: boolean;
  onClose: () => void;
  order: PassOrder | null;
  setOrders: React.Dispatch<React.SetStateAction<PassOrder[]>>;
}

const useStyles = makeStyles({
  textArea: {
    width: "100%",
    padding: "8px 12px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop: "10px",
    resize: "vertical",
  },
});

const ApprovalDialog: FC<ApprovalDialogProps> = ({
  open,
  onClose,
  order,
  setOrders,
}) => {
  const classes = useStyles();
  const { stops } = useStops();

  // State to manage input fields
  const [busPassId, setBusPassId] = useState<string>("");
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedStop, setSelectedStop] = useState<string>(order?.assignedStop || "");
  const [filteredRoutes, setFilteredRoutes] = useState<string[]>([]);

  // Effect to fetch routes when the stop is selected or changed

  useEffect(() => {
    if (order) {
      setSelectedStop(order.assignedStop || "");
    }
  }, [order]);

  useEffect(() => {
    const fetchRoutesForStop = async (stopId: string) => {
      if (!stopId) return;

      try {
        const response = await fetch(`/v2/api/transport/routes?stopId=${stopId}`);
        if (!response.ok) throw new Error(`Error fetching routes: ${response.statusText}`);

        const routesData = await response.json();
        const routesWithStop = routesData.filter((route: any) =>
          route.stops.some((stop: any) => stop.id === parseInt(stopId))
        );
        const routeNames = routesWithStop.map((route: any) => route.name);
        setFilteredRoutes(routeNames);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    const selectedStopId = stops.find((stop) => stop.address === selectedStop)?.id;
    if (selectedStopId) fetchRoutesForStop(selectedStopId.toString());
    else setFilteredRoutes([]);
  }, [selectedStop, stops]);

  const handleBusPassIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusPassId(event.target.value);
  };

  const handleRouteChange = (event: SelectChangeEvent<string>) => {
    setSelectedRoute(event.target.value);
  };

  const handleStopChange = (event: SelectChangeEvent<string>) => {
    setSelectedStop(event.target.value);
  };

  const handleApprove = async () => {
    if (order && selectedRoute && selectedStop && busPassId) {
      try {
        const response = await fetch(`/v2/api/transport/buspasses/${order.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("otptoken")}`,
          },
          body: JSON.stringify({
            status: "approved",
            routeName: selectedRoute,
            assignedStop: selectedStop,
            buspassId: busPassId,
          }),
        });

        if (!response.ok) throw new Error(`Failed to approve the bus pass`);

        const updatedOrder: PassOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((ord) => (ord.id === updatedOrder.id ? updatedOrder : ord))
        );
        onClose();
      } catch (error) {
        console.error("Error approving the bus pass:", error);
        alert("There was an error approving the bus pass. Please try again.");
      }
    }
  };

  const handleReject = async () => {
    if (order && selectedRoute && selectedStop && busPassId) {
      try {
        const response = await fetch(`/v2/api/transport/buspasses/${order.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("otptoken")}`,
          },
          body: JSON.stringify({
            status: "rejected",
            routeName: selectedRoute,
            assignedStop: selectedStop,
            buspassId: busPassId,
          }),
        });

        if (!response.ok) throw new Error(`Failed to reject the bus pass`);

        const updatedOrder: PassOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((ord) => (ord.id === updatedOrder.id ? updatedOrder : ord))
        );
        onClose();
      } catch (error) {
        console.error("Error rejecting the bus pass:", error);
        alert("There was an error rejecting the bus pass. Please try again.");
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Approval Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="buspass-id"
              label="Bus Pass ID"
              type="text"
              fullWidth
              value={busPassId}
              onChange={handleBusPassIdChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              value={selectedStop || ""}
              onChange={handleStopChange}
              fullWidth
              displayEmpty
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">
                Select Stop
              </MenuItem>
              {stops.map((stop) => (
                <MenuItem key={stop.id} value={stop.address}>
                  {stop.address}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Select
              value={selectedRoute || ""}
              onChange={handleRouteChange}
              fullWidth
              displayEmpty
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="" disabled>
                Select Route
              </MenuItem>
              {filteredRoutes.map((route, index) => (
                <MenuItem key={index} value={route}>
                  {route}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReject} color="error">
          Reject
        </Button>
        <Button onClick={handleApprove} color="primary" variant="contained">
          Approve
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApprovalDialog;
