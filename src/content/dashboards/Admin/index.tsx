// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container, Grid, Typography } from "@mui/material";
// import WatchList from "./WatchList";
// import StudentTable from "./StudentTable";

// function DashboardAdmin() {
//   const [studentRequests, setStudentRequests] = useState([]);
//   const [stats, setStats] = useState({ total: 0, approvals: 0, pending: 0 });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = sessionStorage.getItem("otptoken");
//       if (!token) {
//         setError("Authentication token is missing. Please log in again.");
//         return;
//       }

//       try {
//         const response = await fetch("/v2/api/transport/buspasses", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 403) {
//             setError("You are not allowed to perform this operation.");
//           } else {
//             setError(`HTTP error! Status: ${response.status}`);
//           }
//           return;
//         }

//         const data = await response.json();

//         // Calculate stats
//         const total = data.length;
//         const approvals = data.filter(
//           (request) => request.status === "approved"
//         ).length;
//         const pending = data.filter(
//           (request) => request.status === "pending"
//         ).length;

//         setStudentRequests(data);
//         setStats({
//           total,
//           approvals,
//           pending,
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("An error occurred while fetching data.");
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <title>Admin Dashboard</title>
//       </Helmet>
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           {error ? (
//             <Grid item xs={12}>
//               <Typography color="error">{error}</Typography>
//             </Grid>
//           ) : (
//             <>
//               <Grid item xs={12}>
//                 <WatchList stats={stats} />
//               </Grid>
//               <Grid item xs={12}>
//                 <StudentTable studentRequests={studentRequests} />
//               </Grid>
//             </>
//           )}
//         </Grid>
//       </Container>
//     </>
//   );
// }

// export default DashboardAdmin;

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import WatchList from "./WatchList";
import StudentTable from "./StudentTable";

const CustomContainer = styled(Container)(
  () => `
    background-color: white; /* Ensure background color is white */
    padding: 16px; /* Add some padding */
    border-radius: 8px; /* Optional: Add some border radius */
    box-shadow: none; /* Remove any box shadow */
    border: none; /* Remove any border */
`
);

const CustomGrid = styled(Grid)(
  () => `
    border: none; /* Remove any border */
    box-shadow: none; /* Remove any box shadow */
`
);

function DashboardAdmin() {
  const [studentRequests, setStudentRequests] = useState([]);
  const [stats, setStats] = useState({ total: 0, approvals: 0, pending: 0 });
  const [error, setError] = useState(null);

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

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <CustomContainer maxWidth="lg">
        <CustomGrid container spacing={4}>
          {error ? (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <WatchList stats={stats} />
              </Grid>
              <Grid item xs={12}>
                <StudentTable studentRequests={studentRequests} />
              </Grid>
            </>
          )}
        </CustomGrid>
      </CustomContainer>
    </>
  );
}

export default DashboardAdmin;
