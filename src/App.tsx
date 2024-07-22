import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import router from "./router"; // Adjust import path as needed

import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider"; // Adjust import path as needed
import { UserProvider } from "./content/applications/create-user/UserContext";
import { StopsProvider } from "./content/applications/Stops/StopsContext";
import { VehiclesProvider } from "./content/applications/Vehicle/VehicleContext";
import { DriverProvider } from "./content/applications/driver/DriverContext";
function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <StopsProvider>
          <VehiclesProvider>
          <DriverProvider>
            <UserProvider>{content}</UserProvider>
            </DriverProvider>
          </VehiclesProvider>
        </StopsProvider>
      </Suspense>
      {/* </LocalizationProvider> */}
    </ThemeProvider>
  );
}

export default App;
