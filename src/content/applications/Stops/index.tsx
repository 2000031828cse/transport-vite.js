import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  IconButton,
  Container,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useStops } from "./StopsContext";

const Stops: React.FC = () => {
  const navigate = useNavigate();
  const { stops, fetchStops, deleteStop } = useStops();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchStops();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAddStopClick = () => {
    navigate("/management/add-stop");
  };

  const handleEditStop = (stop: any) => {
    navigate("/management/add-stop", { state: { stop } });
  };

  const handleDeleteStop = (id: number) => {
    deleteStop(id);
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

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
        <Typography variant="h5">Stops</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddStopClick}
        >
          Add Stop
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="stops table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ color: "#000000" }}>S.No</TableCell>
              <TableCell sx={{ color: "#000000" }}>Address</TableCell>
              <TableCell sx={{ color: "#000000" }}>Landmark</TableCell>
              <TableCell sx={{ color: "#000000" }}>Latitude</TableCell>
              <TableCell sx={{ color: "#000000" }}>Longitude</TableCell>
              <TableCell sx={{ color: "#000000" }}>Pickup</TableCell>
              <TableCell sx={{ color: "#000000" }}>Drop</TableCell>
              <TableCell sx={{ color: "#000000" }}>Fare</TableCell>
              <TableCell sx={{ color: "#000000" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stops.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography>No stops available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              stops.map((stop) => (
                <TableRow key={stop.id}>
                  <TableCell sx={{ color: "#000000" }}>{stop.id}</TableCell>
                  <TableCell sx={{ color: "#000000" }}>
                    {stop.address}
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }}>
                    {stop.landmark}
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }}>{stop.lat}</TableCell>
                  <TableCell sx={{ color: "#000000" }}>{stop.lng}</TableCell>
                  <TableCell sx={{ color: "#000000" }}>{stop.pickUp}</TableCell>
                  <TableCell sx={{ color: "#000000" }}>
                    {stop.dropTime}
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }}>{stop.fare}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditStop(stop)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteStop(stop.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Stops;
