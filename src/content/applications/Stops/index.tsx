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
import { useStops } from "./StopsContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Stops: React.FC = () => {
  const { stops, deleteStop } = useStops();
  const navigate = useNavigate();

  const handleAddStop = () => {
    navigate("/management/add-stop");
  };

  const handleEditStop = (stop: any) => {
    navigate("/management/add-stop", { state: { stop } });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        p: 2,
        border: "1px solid #ccc",
        backgroundColor: "#ffffff",
        color: "#000000",
        marginBottom: "16px",
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
        <Typography variant="h5">Manage Stops</Typography>
        <Button variant="contained" color="primary" onClick={handleAddStop}>
          Add Stop
        </Button>
      </Box>

      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Stop Number</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Stop Name</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Latitude</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Longitude</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Landmark</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Pick Up Time</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Drop Time</strong>
              </TableCell>
              <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stops.map((stop) => (
              <TableRow key={stop.id}>
                <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                  {stop.id}
                </TableCell>
                <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                  {stop.address}
                </TableCell>
                <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                  {stop.lat}
                </TableCell>
                <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                  {stop.lng}
                </TableCell>
                <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                  {stop.landmark}
                </TableCell>
                <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                  {stop.pickUp}
                </TableCell>
                <TableCell sx={{ minWidth: 150, color: "#000000" }}>
                  {stop.dropTime}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditStop(stop)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteStop(stop.id)}>
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

export default Stops;
