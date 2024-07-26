// // // import React from 'react';
// // // import { Card, Box, Typography, Grid } from '@mui/material';

// // // const WatchListColumn = ({ stats }) => {
// // //   return (
// // //     <Grid container spacing={3}>
// // //       <Grid item md={4} xs={12}>
// // //         <Card>
// // //           <Box p={3}>
// // //             <Typography variant="h1" noWrap>
// // //               Total
// // //             </Typography>
// // //             <Typography variant="h2" sx={{ pt: 3 }}>
// // //               {stats.total}
// // //             </Typography>
// // //           </Box>
// // //         </Card>
// // //       </Grid>
// // //       <Grid item md={4} xs={12}>
// // //         <Card>
// // //           <Box p={3}>
// // //             <Typography variant="h1" noWrap>
// // //               Approvals
// // //             </Typography>
// // //             <Typography variant="h2" sx={{ pt: 3 }}>
// // //               {stats.approvals}
// // //             </Typography>
// // //           </Box>
// // //         </Card>
// // //       </Grid>
// // //       <Grid item md={4} xs={12}>
// // //         <Card>
// // //           <Box p={3}>
// // //             <Typography variant="h1" noWrap>
// // //               Pending
// // //             </Typography>
// // //             <Typography variant="h2" sx={{ pt: 3 }}>
// // //               {stats.pending}
// // //             </Typography>
// // //           </Box>
// // //         </Card>
// // //       </Grid>
// // //     </Grid>
// // //   );
// // // };

// // // export default WatchListColumn;

// // import React from "react";
// // import { Box, Typography, Grid } from "@mui/material";
// // import { PieChart } from "@mui/x-charts/PieChart";

// // const WatchListColumn = ({ stats }) => {
// //   return (
// //     <Grid container spacing={1}>
// //       <Grid item xs={12}>
// //         <Box>
// //           <Typography variant="h1" noWrap>
// //             Overview
// //           </Typography>
// //           <PieChart
// //             series={[
// //               {
// //                 data: [
// //                   { id: 0, value: stats.approvals, label: "Approvals" },
// //                   { id: 1, value: stats.pending, label: "Pending" },
// //                   {
// //                     id: 2,
// //                     value: stats.total,
// //                     label: "Total",
// //                   },
// //                 ],
// //               },
// //             ]}
// //             width={400}
// //             height={200}
// //           />
// //         </Box>
// //       </Grid>
// //     </Grid>
// //   );
// // };

// // export default WatchListColumn;

// import React from "react";
// import { Box, Typography, Grid } from "@mui/material";
// import { PieChart } from "@mui/x-charts/PieChart";

// const WatchListColumn = ({ stats }) => {
//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Box p={3}>
//           <Typography variant="h1" noWrap>
//             Overview
//           </Typography>
//           <PieChart
//             series={[
//               {
//                 data: [
//                   {
//                     id: 0,
//                     value: stats.total,
//                     label: `Total (${stats.total})`,
//                   },
//                   {
//                     id: 1,
//                     value: stats.approvals,
//                     label: `Approvals (${stats.approvals})`,
//                   },
//                   {
//                     id: 2,
//                     value: stats.pending,
//                     label: `Pending (${stats.pending})`,
//                   },
//                 ],
//               },
//             ]}
//             width={400}
//             height={200}
//           />
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default WatchListColumn;

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

const WatchListColumn = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box>
          <Typography variant="h1" noWrap>
            Overview
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: stats.total,
                    label: `Total (${stats.total})`,
                  },
                  {
                    id: 1,
                    value: stats.approvals,
                    label: `Approvals (${stats.approvals})`,
                  },
                  {
                    id: 2,
                    value: stats.pending,
                    label: `Pending (${stats.pending})`,
                  },
                ],
              },
            ]}
            width={400}
            height={200}
            colors={["#ada3e6", "#aff0b7", "#a3c9e6"]} // Lighter colors
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default WatchListColumn;
