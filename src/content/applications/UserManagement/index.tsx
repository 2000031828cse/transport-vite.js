import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Grid, Typography, TextField, MenuItem, TablePagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import UserTable from "./UserTable";

const CustomContainer = styled(Container)(
  () => `
    background-color: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: none;
    border: none;
`
);

const CustomGrid = styled(Grid)(
  () => `
    border: none;
    box-shadow: none;
`
);

function UserManagement() {
  const [studentRequests, setStudentRequests] = useState([]);
  const [stats, setStats] = useState({ total: 0, approvals: 0, pending: 0 });
  const [error, setError] = useState(null);
  const [routeFilter, setRouteFilter] = useState("");
  const [stopFilter, setStopFilter] = useState("");
  const [filteredStops, setFilteredStops] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("otptoken");
      if (!token) {
        setError("Authentication token is missing. Please log in again.");
        return;
      }

      try {
        const response = await fetch("/v2/api/transport/buspasses", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            setError("You are not allowed to perform this operation.");
          } else {
            setError(`HTTP error! Status: ${response.status}`);
          }
          return;
        }

        const data = await response.json();

        // Calculate stats
        const total = data.length;
        const approvals = data.filter(
          (request) => request.status === "approved"
        ).length;
        const pending = data.filter(
          (request) => request.status === "pending"
        ).length;

        setStudentRequests(data);
        setStats({
          total,
          approvals,
          pending,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

  const handleRouteFilterChange = (event) => {
    const selectedRoute = event.target.value;
    setRouteFilter(selectedRoute);

    // Update the stops filter options based on the selected route
    if (selectedRoute === "") {
      setFilteredStops([]);
    } else {
      const stops = studentRequests
        .filter((request) => request.routeName === selectedRoute)
        .map((request) => request.requestStopName);
      setFilteredStops([...new Set(stops)]);
    }

    // Reset stop filter when route filter changes
    setStopFilter("");
  };

  const handleStopFilterChange = (event) => {
    setStopFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRequests = studentRequests.filter((request) => {
    return (
      (routeFilter === "" || request.routeName === routeFilter) &&
      (stopFilter === "" || request.requestStopName === stopFilter)
    );
  });

  // Get unique routes for the filter
  const uniqueRoutes = [...new Set(studentRequests.map((req) => req.routeName))];

  const currentRequests = filteredRequests.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <CustomContainer maxWidth="lg" sx={{ mt: 2 }}>
        <CustomGrid container spacing={4}>
          {error ? (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          ) : (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Filter by Route"
                  value={routeFilter}
                  onChange={handleRouteFilterChange}
                  fullWidth
                >
                  <MenuItem value="">All Routes</MenuItem>
                  {uniqueRoutes.map((route) => (
                    <MenuItem key={route} value={route}>
                      {route}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Filter by Stop"
                  value={stopFilter}
                  onChange={handleStopFilterChange}
                  fullWidth
                  disabled={routeFilter === ""}
                >
                  <MenuItem value="">All Stops</MenuItem>
                  {filteredStops.map((stop) => (
                    <MenuItem key={stop} value={stop}>
                      {stop}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <UserTable studentRequests={currentRequests} />
                <TablePagination
                  component="div"
                  count={filteredRequests.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 15, 20]}
                />
              </Grid>
            </>
          )}
        </CustomGrid>
      </CustomContainer>
    </>
  );
}

export default UserManagement;
