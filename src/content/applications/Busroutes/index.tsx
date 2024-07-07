// import React from 'react';
// import {
//   Card,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Box,
//   Button,
//   IconButton,
//   Container
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { useNavigate } from 'react-router-dom';
// import { useBusRoutes } from './BusRoutesContext';

// const BusRoutes: React.FC = () => {
//   const navigate = useNavigate();
//   const { routes, deleteRoute } = useBusRoutes();

//   const handleAddRouteClick = () => {
//     navigate('/management/addroutes');
//   };

//   const handleEditRoute = (route) => {
//     navigate(`/management/addroutes?edit=${route.sno}`);
//   };

//   const handleDeleteRoute = (sno: number) => {
//     deleteRoute(sno);
//   };

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         mt: 4,
//         p: 2,
//         border: '1px solid #ccc',
//         backgroundColor: '#ffffff',
//         color: '#000000',
//         marginBottom: '16px'
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: '16px'
//         }}
//       >
//         <Typography variant="h6">Bus Routes</Typography>
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: '#000000',
//             color: '#ffffff',
//             '&:hover': { backgroundColor: '#333333' }
//           }}
//           startIcon={<AddIcon />}
//           onClick={handleAddRouteClick}
//         >
//           Add Route
//         </Button>
//       </Box>
//       <TableContainer>
//         <Table sx={{ minWidth: 650 }} aria-label="bus routes table">
//           <TableHead>
//             <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//               <TableCell sx={{ color: '#000000' }}>S.No</TableCell>

//               <TableCell sx={{ color: '#000000' }}>Route Name</TableCell>
//               <TableCell sx={{ color: '#000000' }}>Timings</TableCell>
//               <TableCell sx={{ color: '#000000' }}>Stops</TableCell>
//               <TableCell sx={{ color: '#000000' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {routes.map((route) => (
//               <TableRow key={route.sno}>
//                 <TableCell sx={{ color: '#000000' }}>{route.sno}</TableCell>
//                 <TableCell sx={{ color: '#000000' }}>
//                   {route.routeName}
//                 </TableCell>
//                 <TableCell sx={{ color: '#000000' }}>{route.timings}</TableCell>
//                 <TableCell sx={{ color: '#000000' }}>
//                   {route.stops.join(' - ')}
//                 </TableCell>
//                 <TableCell>
//                   <IconButton
//                     color="primary"
//                     onClick={() => handleEditRoute(route)}
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     color="error"
//                     onClick={() => handleDeleteRoute(route.sno)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default BusRoutes;

import React from 'react';
import {
  Card,
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
  Container
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useBusRoutes } from './BusRoutesContext';

const BusRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { routes, deleteRoute } = useBusRoutes();

  const handleAddRouteClick = () => {
    navigate('/management/addroutes');
  };

  const handleEditRoute = (route) => {
    navigate(`/management/addroutes?edit=${route.sno}`);
  };

  const handleDeleteRoute = (sno: number) => {
    deleteRoute(sno);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        p: 2,
        border: '1px solid #ccc',
        backgroundColor: '#ffffff',
        color: '#000000',
        marginBottom: '16px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px'
        }}
      >
        <Typography variant="h6">Bus Routes</Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#000000',
            color: '#ffffff',
            '&:hover': { backgroundColor: '#333333' }
          }}
          startIcon={<AddIcon />}
          onClick={handleAddRouteClick}
        >
          Add Route
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="bus routes table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ color: '#000000' }}>S.No</TableCell>
              <TableCell sx={{ color: '#000000' }}>Route Name</TableCell>
              <TableCell sx={{ color: '#000000' }}>Timings</TableCell>
              <TableCell sx={{ color: '#000000' }}>Stops</TableCell>
              <TableCell sx={{ color: '#000000' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.sno}>
                <TableCell sx={{ color: '#000000' }}>{route.sno}</TableCell>
                <TableCell sx={{ color: '#000000' }}>
                  {route.routeName}
                </TableCell>
                <TableCell sx={{ color: '#000000' }}>{route.timings}</TableCell>
                <TableCell sx={{ color: '#000000' }}>
                  {route.stops.join(' - ')}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditRoute(route)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRoute(route.sno)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BusRoutes;
