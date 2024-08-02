// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   TextField,
//   MenuItem,
//   Button,
//   Typography,
//   Box
// } from '@mui/material';

// interface Term {
//   id: number;
//   startDate: string;
//   endDate: string;
//   sem: string;
// }

// interface BusStop {
//   id: string;
//   address: string;
// }

// interface Route {
//   id: string;
//   name: string;
//   stops: { id: string }[]; // Assuming each route has an array of stops
// }

// const otpt = sessionStorage.getItem('otptoken');
// const BusPassRequest: React.FC = () => {
//   const [terms, setTerms] = useState<Term[]>([]);
//   const [busStops, setBusStops] = useState<BusStop[]>([]);
//   const [routes, setRoutes] = useState<Route[]>([]);
//   const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
//   const [selectedTerm, setSelectedTerm] = useState<number | ''>('');
//   const [selectedSemester, setSelectedSemester] = useState<string>('');
//   const [selectedBusStop, setSelectedBusStop] = useState<string>('');
//   const [selectedRoute, setSelectedRoute] = useState<string>('');
//   const [otherBusStop, setOtherBusStop] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const [requestType, setRequestType] = useState<string>('');

//   const requestTypeOptions = [
//     { value: 'New Bus Pass Request', label: 'New Bus Pass Request' },
//     { value: 'Buspass Generation', label: 'Buspass Generation' },
//     { value: 'Update the route', label: 'Update the route' },
//   ];

//   useEffect(() => {
//     // Fetch terms from backend
//     const fetchTerms = async () => {
//       try {
//         const response = await fetch('/v2/api/transport/terms');
//         if (!response.ok) {
//           throw new Error(`Error fetching terms: ${response.statusText}`);
//         }
//         const fetchedTerms: Term[] = await response.json();
//         setTerms(fetchedTerms);
//       } catch (error) {
//         console.error('Error fetching terms:', error);
//         setError('Failed to fetch terms. Please try again.');
//       }
//     };

//     // Fetch bus stops from backend
//     const fetchBusStops = async () => {
//       try {
//         const response = await fetch('/v2/api/transport/stops');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const fetchedBusStops: BusStop[] = await response.json();
//         setBusStops(fetchedBusStops);
//       } catch (error) {
//         console.error('Error fetching bus stops:', error);
//         setError('Failed to fetch bus stops. Please try again.');
//       }
//     };

//     // Fetch all routes initially
//     const fetchRoutes = async () => {
//       try {
//         const response = await fetch('/v2/api/transport/routes');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const fetchedRoutes: Route[] = await response.json();
//         setRoutes(fetchedRoutes);
//       } catch (error) {
//         console.error('Error fetching routes:', error);
//         setError('Failed to fetch routes. Please try again.');
//       }
//     };

//     fetchTerms();
//     fetchBusStops();
//     fetchRoutes();
//   }, []);

//   useEffect(() => {
//     // Filter routes based on selected bus stop
//     if (requestType === 'Update the route' && selectedBusStop) {
//       const stopId = selectedBusStop;
//       const filtered = routes.filter(route => 
//         route.stops.some(stop => stop.id === stopId)
//       );
//       setFilteredRoutes(filtered);
//     } else {
//       setFilteredRoutes([]);
//     }
//   }, [requestType, selectedBusStop, routes]);

//   // Handle changes to the term selection
//   const handleTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const termId = parseInt(event.target.value, 10);
//     setSelectedTerm(termId);
//     setSelectedSemester(''); // Reset semester when term changes
//   };

//   // Handle changes to the semester selection
//   const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedSemester(event.target.value);
//   };

//   // Handle changes to the bus stop selection
//   const handleBusStopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const busStopId = event.target.value;
//     setSelectedBusStop(busStopId);

//     if (requestType === 'Update the route') {
//       // Trigger fetch routes when bus stop changes
//       setFilteredRoutes([]); // Clear previous routes
//     }
//   };

//   // Handle changes to the route selection
//   const handleRouteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedRoute(event.target.value);
//   };

//   // Handle changes to the other bus stop input
//   const handleOtherBusStopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setOtherBusStop(event.target.value);
//   };

//   // Handle changes to the request type
//   const handleRequestTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRequestType(event.target.value);
//     setSelectedTerm(''); // Reset term and semester when request type changes
//     setSelectedSemester('');
//     setSelectedBusStop('');
//     setSelectedRoute('');
//     setOtherBusStop('');
//   };

//   // Handle form submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     let payload;

//     if (requestType === 'New Bus Pass Request') {
//       if (selectedBusStop === 'Others') {
//         // Payload for other bus stop
//         payload = {
//           requestedStopName: otherBusStop,
//           termStartDate: terms.find(t => t.id === selectedTerm)?.startDate,
//           termEndDate: terms.find(t => t.id === selectedTerm)?.endDate,
//           sem: selectedSemester,
//           requestType: requestType
//         };
//       } else {
//         // Payload for existing bus stop
//         const stopAddress = busStops.find(stop => stop.id === selectedBusStop)?.address;
//         if (!stopAddress) {
//           setError('Selected bus stop does not exist.');
//           return;
//         }

//         payload = {
//           stopName: stopAddress,
//           termStartDate: terms.find(t => t.id === selectedTerm)?.startDate,
//           termEndDate: terms.find(t => t.id === selectedTerm)?.endDate,
//           sem: selectedSemester,
//           requestType: requestType
//         };
//       }

//       if (!selectedTerm || !selectedSemester || !payload) {
//         setError('Please select a term, semester, and bus stop.');
//         return;
//       }
//     } else if (requestType === 'Update the route') {
//       if (selectedBusStop === 'Others') {
//         setError('Please select a valid bus stop.');
//         return;
//       }

//       const stopAddress = busStops.find(stop => stop.id === selectedBusStop)?.address;
//       if (!stopAddress) {
//         setError('Selected bus stop does not exist.');
//         return;
//       }

//       if (!selectedRoute) {
//         setError('Please select a route.');
//         return;
//       }

//       payload = {
//         termStartDate: terms.find(t => t.id === selectedTerm)?.startDate,
//         termEndDate: terms.find(t => t.id === selectedTerm)?.endDate,
//         sem: selectedSemester,
//         stop: stopAddress,
//         routeName: selectedRoute,
//         requestType: requestType
//       };
//     } else if (requestType === 'Buspass Generation') {
//       payload = {
//         termStartDate: terms.find(t => t.id === selectedTerm)?.startDate,
//           termEndDate: terms.find(t => t.id === selectedTerm)?.endDate,
//           sem: selectedSemester,
//         requestType
//       };
//     } else {
//       setError('Please select a request type.');
//       return;
//     }

//     setError('');

//     try {
//       const response = await fetch('/v2/api/transport/buspasses', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${otpt}`
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       alert(`Bus pass requested successfully. Response: ${JSON.stringify(result)}`);
//       // Optionally, navigate to another page or clear form
//       setRequestType('');
//       setSelectedTerm('');
//       setSelectedSemester('');
//       setSelectedBusStop('');
//       setSelectedRoute('');
//       setOtherBusStop('');
//     } catch (error) {
//       console.error('Error requesting bus pass:', error);
//       setError('There was an error requesting the bus pass. Please try again.');
//     }
//   };

//   // Extract terms for the dropdown
//   const termOptions = terms.map(term => ({
//     id: term.id,
//     label: `${new Date(term.startDate).toLocaleDateString()} - ${new Date(term.endDate).toLocaleDateString()}`
//   }));

//   // Filter semesters based on the selected term
//   const filteredSemesters = terms
//     .filter(term => term.id === selectedTerm)
//     .map(term => term.sem);

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Bus Pass Request
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//         <Box sx={{ mb: 2 }}>
//           <TextField
//             select
//             fullWidth
//             label="Select Request Type"
//             value={requestType}
//             onChange={handleRequestTypeChange}
//             required
//           >
//             <MenuItem value="" disabled>Select a request type</MenuItem>
//             {requestTypeOptions.map(option => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Box>

//         {(requestType === 'New Bus Pass Request' || requestType === 'Buspass Generation' || requestType === 'Update the route') && (
//           <Box sx={{ mb: 2 }}>
//             <TextField
//               select
//               fullWidth
//               label="Select Term"
//               value={selectedTerm}
//               onChange={handleTermChange}
//               required={requestType === 'New Bus Pass Request'}
//             >
//               <MenuItem value="" disabled>Select a term</MenuItem>
//               {termOptions.map(option => (
//                 <MenuItem key={option.id} value={option.id}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Box>
//         )}

//         {(requestType === 'New Bus Pass Request' || requestType === 'Buspass Generation' || requestType === 'Update the route' )&& (
//           <Box sx={{ mb: 2 }}>
//             <TextField
//               select
//               fullWidth
//               label="Select Semester"
//               value={selectedSemester}
//               onChange={handleSemesterChange}
//               required
//               disabled={!selectedTerm}
//             >
//               <MenuItem value="" disabled>Select a semester</MenuItem>
//               {filteredSemesters.map(semester => (
//                 <MenuItem key={semester} value={semester}>
//                   {semester}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Box>
//         )}

//         {(requestType === 'New Bus Pass Request' || requestType === 'Update the route') && (
//           <Box sx={{ mb: 2 }}>
//             <TextField
//               select
//               fullWidth
//               label="Select Bus Stop"
//               value={selectedBusStop}
//               onChange={handleBusStopChange}
//               required
//             >
//               <MenuItem value="" disabled>Select a bus stop</MenuItem>
//               {busStops.map(stop => (
//                 <MenuItem key={stop.id} value={stop.id}>
//                   {stop.address}
//                 </MenuItem>
//               ))}
//               <MenuItem value="Others">Others</MenuItem>
//             </TextField>
//           </Box>
//         )}

//         {requestType === 'New Bus Pass Request' && selectedBusStop === 'Others' && (
//           <Box sx={{ mb: 2 }}>
//             <TextField
//               fullWidth
//               label="Enter Other Bus Stop"
//               value={otherBusStop}
//               onChange={handleOtherBusStopChange}
//               required
//             />
//           </Box>
//         )}

//         {requestType === 'Update the route' && (
//           <Box sx={{ mb: 2 }}>
//             <TextField
//               select
//               fullWidth
//               label="Select Route"
//               value={selectedRoute}
//               onChange={handleRouteChange}
//               required
//               disabled={!selectedBusStop || selectedBusStop === 'Others'}
//             >
//               <MenuItem value="" disabled>Select a route</MenuItem>
//               {filteredRoutes.map(route => (
//                 <MenuItem key={route.id} value={route.name}>
//                   {route.name}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Box>
//         )}

//         {error && (
//           <Typography color="error" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}

//         <Box sx={{ textAlign: 'center' }}>
//           <Button type="submit" variant="contained" color="primary">
//             Submit
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default BusPassRequest;



import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box
} from '@mui/material';

interface Term {
  id: number;
  startDate: string;
  endDate: string;
  sem: string;
}

interface BusStop {
  id: string;
  address: string;
}

interface Route {
  id: string;
  name: string;
  stops: { id: string }[]; // Assuming each route has an array of stops
}

const otpt = sessionStorage.getItem('otptoken');
const BusPassRequest: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<number | ''>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedBusStop, setSelectedBusStop] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [otherBusStop, setOtherBusStop] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [requestType, setRequestType] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const requestTypeOptions = [
    { value: 'New Bus Pass Request', label: 'New Bus Pass Request' },
    { value: 'Buspass Generation', label: 'Buspass Generation' },
    { value: 'Update the route', label: 'Update the route' },
  ];

  useEffect(() => {
    // Fetch terms from backend
    const fetchTerms = async () => {
      try {
        const response = await fetch('/v2/api/transport/terms');
        if (!response.ok) {
          throw new Error(`Error fetching terms: ${response.statusText}`);
        }
        const fetchedTerms: Term[] = await response.json();
        setTerms(fetchedTerms);
      } catch (error) {
        console.error('Error fetching terms:', error);
        setError('Failed to fetch terms. Please try again.');
      }
    };

    // Fetch bus stops from backend
    const fetchBusStops = async () => {
      try {
        const response = await fetch('/v2/api/transport/stops');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedBusStops: BusStop[] = await response.json();
        setBusStops(fetchedBusStops);
      } catch (error) {
        console.error('Error fetching bus stops:', error);
        setError('Failed to fetch bus stops. Please try again.');
      }
    };

    // Fetch all routes initially
    const fetchRoutes = async () => {
      try {
        const response = await fetch('/v2/api/transport/routes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedRoutes: Route[] = await response.json();
        setRoutes(fetchedRoutes);
      } catch (error) {
        console.error('Error fetching routes:', error);
        setError('Failed to fetch routes. Please try again.');
      }
    };

    fetchTerms();
    fetchBusStops();
    fetchRoutes();
  }, []);

  useEffect(() => {
    // Filter routes based on selected bus stop
    if (requestType === 'Update the route' && selectedBusStop) {
      const stopId = selectedBusStop;
      const filtered = routes.filter(route => 
        route.stops.some(stop => stop.id === stopId)
      );
      setFilteredRoutes(filtered);
    } else {
      setFilteredRoutes([]);
    }
  }, [requestType, selectedBusStop, routes]);

  // Handle changes to the term selection
  const handleTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const termId = parseInt(event.target.value, 10);
    setSelectedTerm(termId);
    setSelectedSemester(''); // Reset semester when term changes
  };

  // Handle changes to the semester selection
  const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSemester(event.target.value);
  };

  // Handle changes to the bus stop selection
  const handleBusStopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const busStopId = event.target.value;
    setSelectedBusStop(busStopId);

    if (requestType === 'Update the route') {
      // Trigger fetch routes when bus stop changes
      setFilteredRoutes([]); // Clear previous routes
    }
  };

  // Handle changes to the route selection
  const handleRouteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRoute(event.target.value);
  };

  // Handle changes to the other bus stop input
  const handleOtherBusStopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherBusStop(event.target.value);
  };

  // Handle changes to the request type
  const handleRequestTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestType(event.target.value);
    setSelectedTerm(''); // Reset term and semester when request type changes
    setSelectedSemester('');
    setSelectedBusStop('');
    setSelectedRoute('');
    setOtherBusStop('');
    setSuccessMessage(''); // Clear success message when request type changes
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let payload;

    if (requestType === 'New Bus Pass Request') {
      if (selectedBusStop === 'Others') {
        // Payload for other bus stop
        payload = {
          requestedStopName: otherBusStop,
          termStartDate: terms.find(t => t.id === selectedTerm)?.startDate,
          termEndDate: terms.find(t => t.id === selectedTerm)?.endDate,
          sem: selectedSemester,
          requestType: requestType
        };
      } else {
        // Payload for existing bus stop
        const stopAddress = busStops.find(stop => stop.id === selectedBusStop)?.address;
        if (!stopAddress) {
          setError('Selected bus stop does not exist.');
          return;
        }

        payload = {
          stopName: stopAddress,
          termStartDate: terms.find(t => t.id === selectedTerm)?.startDate,
          termEndDate: terms.find(t => t.id === selectedTerm)?.endDate,
          sem: selectedSemester,
          requestType: requestType
        };
      }

      if (!selectedTerm || !selectedSemester || !payload) {
        setError('Please select a term, semester, and bus stop.');
        return;
      }
    } else if (requestType === 'Update the route') {
      if (selectedBusStop === 'Others') {
        setError('Please select a valid bus stop.');
        return;
      }

      const stopAddress = busStops.find(stop => stop.id === selectedBusStop)?.address;
      if (!stopAddress) {
        setError('Selected bus stop does not exist.');
        return;
      }

      if (!selectedRoute) {
        setError('Please select a route.');
        return;
      }

      payload = {
        termStartDate: terms.find(t => t.id === selectedTerm)?.startDate,
        termEndDate: terms.find(t => t.id === selectedTerm)?.endDate,
        sem: selectedSemester,
        stop: stopAddress,
        routeName: selectedRoute,
        requestType: requestType
      };
    } else if (requestType === 'Buspass Generation') {
      payload = {
        termStartDate: terms.find(t => t.id === selectedTerm)?.startDate,
          termEndDate: terms.find(t => t.id === selectedTerm)?.endDate,
          sem: selectedSemester,
        requestType
      };
    } else {
      setError('Please select a request type.');
      return;
    }

    setError('');

    try {
      const response = await fetch('/v2/api/transport/buspasses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${otpt}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setSuccessMessage('Bus pass requested successfully.');
      // Optionally, navigate to another page or clear form
      setRequestType('');
      setSelectedTerm('');
      setSelectedSemester('');
      setSelectedBusStop('');
      setSelectedRoute('');
      setOtherBusStop('');
    } catch (error) {
      console.error('Error requesting bus pass:', error);
      setError('There was an error requesting the bus pass. Please try again.');
    }
  };

  // Extract terms for the dropdown
  const termOptions = terms.map(term => ({
    id: term.id,
    label: `${new Date(term.startDate).toLocaleDateString()} - ${new Date(term.endDate).toLocaleDateString()}`
  }));

  // Filter semesters based on the selected term
  const filteredSemesters = terms
    .filter(term => term.id === selectedTerm)
    .map(term => term.sem);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bus Pass Request
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Box sx={{ mb: 2 }}>
          <TextField
            select
            fullWidth
            label="Select Request Type"
            value={requestType}
            onChange={handleRequestTypeChange}
            required
          >
            <MenuItem value="" disabled>Select a request type</MenuItem>
            {requestTypeOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {(requestType === 'New Bus Pass Request' || requestType === 'Buspass Generation' || requestType === 'Update the route') && (
          <Box sx={{ mb: 2 }}>
            <TextField
              select
              fullWidth
              label="Select Term"
              value={selectedTerm}
              onChange={handleTermChange}
              required={requestType === 'New Bus Pass Request'}
            >
              <MenuItem value="" disabled>Select a term</MenuItem>
              {termOptions.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        {(requestType === 'New Bus Pass Request' || requestType === 'Buspass Generation' || requestType === 'Update the route' )&& (
          <Box sx={{ mb: 2 }}>
            <TextField
              select
              fullWidth
              label="Select Semester"
              value={selectedSemester}
              onChange={handleSemesterChange}
              required
              disabled={!selectedTerm}
            >
              <MenuItem value="" disabled>Select a semester</MenuItem>
              {filteredSemesters.map(semester => (
                <MenuItem key={semester} value={semester}>
                  {semester}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        {(requestType === 'New Bus Pass Request' || requestType === 'Update the route') && (
          <Box sx={{ mb: 2 }}>
            <TextField
              select
              fullWidth
              label="Select Bus Stop"
              value={selectedBusStop}
              onChange={handleBusStopChange}
              required
            >
              <MenuItem value="" disabled>Select a bus stop</MenuItem>
              {busStops.map(stop => (
                <MenuItem key={stop.id} value={stop.id}>
                  {stop.address}
                </MenuItem>
              ))}
              <MenuItem value="Others">Others</MenuItem>
            </TextField>
          </Box>
        )}

        {requestType === 'New Bus Pass Request' && selectedBusStop === 'Others' && (
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Enter Other Bus Stop"
              value={otherBusStop}
              onChange={handleOtherBusStopChange}
              required
            />
          </Box>
        )}

        {requestType === 'Update the route' && (
          <Box sx={{ mb: 2 }}>
            <TextField
              select
              fullWidth
              label="Select Route"
              value={selectedRoute}
              onChange={handleRouteChange}
              required
              disabled={!selectedBusStop || selectedBusStop === 'Others'}
            >
              <MenuItem value="" disabled>Select a route</MenuItem>
              {filteredRoutes.map(route => (
                <MenuItem key={route.id} value={route.name}>
                  {route.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {successMessage && (
          <Typography color="primary" sx={{ mb: 2 }}>
            {successMessage}
          </Typography>
        )}

        <Box sx={{ textAlign: 'center' }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BusPassRequest;
