// import React, { FC, useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   SelectChangeEvent
// } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { PassOrderStatus } from 'src/models/pass_request';
// import { useStops } from '../Stops/StopsContext';

// interface ApprovalDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onSave: (status: PassOrderStatus, routeName: string, assignedStop: string, busPassId: string) => void;
//   order: {
//     buspassId: string;
//     routeName: string;
//     assignedStop: string;
//   };
// }

// const useStyles = makeStyles({
//   textArea: {
//     width: '100%',
//     padding: '8px 12px',
//     fontSize: '1rem',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     marginTop: '10px',
//     resize: 'vertical'
//   }
// });

// const ApprovalDialog: FC<ApprovalDialogProps> = ({ open, onClose, onSave, order }) => {
//   const classes = useStyles();
//   const [busPassId, setBusPassId] = useState<string>(order.buspassId || '');
//   const [selectedRoute, setSelectedRoute] = useState<string>(order.routeName || '');
//   const [selectedStop, setSelectedStop] = useState<string>(order.assignedStop || '');
//   const { stops } = useStops();
//   const [filteredRoutes, setFilteredRoutes] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchRoutesForStop = async (stopId: string) => {
//       if (!stopId) return; // Avoid fetching if no stop ID is provided

//       try {
//         console.log(`Fetching routes for stop ID: ${stopId}`);
//         const response = await fetch(`/v2/api/transport/routes?stopId=${stopId}`);
        
//         if (!response.ok) {
//           throw new Error(`Error fetching routes: ${response.statusText}`);
//         }

//         const routesData = await response.json();
//         console.log('Fetched routes data:', routesData);

//         // Filter routes that contain the selected stop
//         const routesWithStop = routesData.filter((route: any) =>
//           route.stops.some((stop: any) => stop.id === parseInt(stopId))
//         );
//         console.log('Filtered routes with selected stop:', routesWithStop);

//         // Extract the route names from the filtered routes
//         const routeNames = routesWithStop.map((route: any) => route.name);
//         setFilteredRoutes(routeNames);
//       } catch (error) {
//         console.error('Error fetching routes:', error);
//       }
//     };

//     const selectedStopId = stops.find(stop => stop.address === selectedStop)?.id;
//     if (selectedStopId) {
//       fetchRoutesForStop(selectedStopId.toString());
//     } else {
//       setFilteredRoutes([]);
//     }
//   }, [selectedStop, stops]);

//   const handleBusPassIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setBusPassId(event.target.value);
//   };

//   const handleRouteChange = (event: SelectChangeEvent<string>) => {
//     setSelectedRoute(event.target.value);
//   };

//   const handleStopChange = (event: SelectChangeEvent<string>) => {
//     setSelectedStop(event.target.value);
//   };

//   const handleApprove = () => {
//     if (order) {
//       // Ensure routeName and assignedStop are provided for approval
//       const routeName = selectedRoute || null;
//       const assignedStop = selectedStop || null;
      
//       if (routeName && assignedStop) {
//         onSave('approved', routeName, assignedStop, busPassId);
//         onClose();
//       } else {
//         console.error("Approval failed: routeName and assignedStop are required.");
//         // Optionally, show an error message to the user
//       }
//     }
//   };

//   const handleReject = () => {
//     if (order) {
//       // Default to null if routeName or assignedStop are not provided
//       const routeName = selectedRoute || null; 
//       const assignedStop = selectedStop || null;
  
//       onSave('rejected', routeName, assignedStop, busPassId);
//       onClose();
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Approval Details</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           id="buspass-id"
//           label="Bus Pass ID"
//           type="text"
//           fullWidth
//           value={busPassId}
//           onChange={handleBusPassIdChange}
//         />
//         <Select
//           value={selectedStop || ''}
//           onChange={handleStopChange}
//           displayEmpty
//           fullWidth
//           style={{ marginTop: '10px' }}
//         >
//           <MenuItem value="">
//             Select Stop
//           </MenuItem>
//           {stops.map((stop) => (
//             <MenuItem key={stop.id} value={stop.address}>
//               {stop.address}
//             </MenuItem>
//           ))}
//         </Select>
//         <Select
//           value={selectedRoute || ''}
//           onChange={handleRouteChange}
//           displayEmpty
//           fullWidth
//           style={{ marginTop: '10px' }}
//         >
//           <MenuItem value="" disabled>
//             Select Route
//           </MenuItem>
//           {filteredRoutes.map((route, index) => (
//             <MenuItem key={index} value={route}>
//               {route}
//             </MenuItem>
//           ))}
//         </Select>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleReject} color="error">
//           Reject
//         </Button>
//         <Button onClick={handleApprove} color="primary">
//           Approve
//         </Button>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ApprovalDialog;

import React, { FC, useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { PassOrderStatus } from 'src/models/pass_request';
import { useStops } from '../Stops/StopsContext';

interface ApprovalDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (status: PassOrderStatus, routeName: string, assignedStop: string, busPassId: string) => void;
  order: {
    buspassId: string;
    routeName: string;
    assignedStop: string;
  };
}

const useStyles = makeStyles({
  textArea: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '10px',
    resize: 'vertical'
  }
});

const ApprovalDialog: FC<ApprovalDialogProps> = ({ open, onClose, onSave, order }) => {
  const classes = useStyles();
  const [busPassId, setBusPassId] = useState<string>(order.buspassId || '');
  const [selectedRoute, setSelectedRoute] = useState<string>(order.routeName || '');
  const [selectedStop, setSelectedStop] = useState<string>(order.assignedStop || '');
  const { stops } = useStops();
  const [filteredRoutes, setFilteredRoutes] = useState<string[]>([]);

  useEffect(() => {
    const fetchRoutesForStop = async (stopId: string) => {
      if (!stopId) return; // Avoid fetching if no stop ID is provided

      try {
        console.log(`Fetching routes for stop ID: ${stopId}`);
        const response = await fetch(`/v2/api/transport/routes?stopId=${stopId}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching routes: ${response.statusText}`);
        }

        const routesData = await response.json();
        console.log('Fetched routes data:', routesData);

        // Filter routes that contain the selected stop
        const routesWithStop = routesData.filter((route: any) =>
          route.stops.some((stop: any) => stop.id === parseInt(stopId))
        );
        console.log('Filtered routes with selected stop:', routesWithStop);

        // Extract the route names from the filtered routes
        const routeNames = routesWithStop.map((route: any) => route.name);
        setFilteredRoutes(routeNames);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    const selectedStopId = stops.find(stop => stop.address === selectedStop)?.id;
    if (selectedStopId) {
      fetchRoutesForStop(selectedStopId.toString());
    } else {
      setFilteredRoutes([]);
    }
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

  const handleApprove = () => {
    if (order) {
      const routeName = selectedRoute || '';
      const assignedStop = selectedStop || '';

      if (routeName && assignedStop && busPassId) {
        onSave('approved', routeName, assignedStop, busPassId); // Send busPassId
        onClose();
      } else {
        console.error("Approval failed: routeName, assignedStop, and busPassId are required.");
        // Optionally, show an error message to the user
      }
    }
  };

  const handleReject = () => {
    if (order) {
      const routeName = selectedRoute || '';
      const assignedStop = selectedStop || '';

      onSave('rejected', routeName, assignedStop, busPassId); // Send busPassId
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Approval Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="buspass-id"
          label="Bus Pass ID"
          type="text"
          fullWidth
          value={busPassId}
          onChange={handleBusPassIdChange}
        />
        <Select
          value={selectedStop || ''}
          onChange={handleStopChange}
          displayEmpty
          fullWidth
          style={{ marginTop: '10px' }}
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
        <Select
          value={selectedRoute || ''}
          onChange={handleRouteChange}
          displayEmpty
          fullWidth
          style={{ marginTop: '10px' }}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReject} color="error">
          Reject
        </Button>
        <Button onClick={handleApprove} color="primary">
          Approve
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApprovalDialog;
