// import React, { useState } from "react";
// import { Box, Card } from "@mui/material";
// import WatchListColumn from "./WatchListColumn";

// const WatchList = ({ stats }) => {
//   const [tabs, setTab] = useState<string | null>("watch_list_columns");

//   return (
//     <>
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="space-between"
//       ></Box>
//       {tabs === "watch_list_columns" && <WatchListColumn stats={stats} />}
//       {!tabs && <Card sx={{ textAlign: "center" }}></Card>}
//     </>
//   );
// };

// export default WatchList;


import React, { useState } from "react";
import { Box, Card } from "@mui/material";
import WatchListColumn from "./WatchListColumn";

const WatchList = ({ stats }) => {
  const [tabs, setTab] = useState<string | null>("watch_list_columns");

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between"></Box>
      {tabs === "watch_list_columns" && <WatchListColumn stats={stats} />}
      {!tabs && <Card sx={{ textAlign: "center" }}></Card>}
    </>
  );
};

export default WatchList;
