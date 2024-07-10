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
//   startYear: number;
//   endYear: number;
//   sem: string;
// }

// interface BusStop {
//   id: string;
//   name: string;
// }

// const BusPassRequest: React.FC = () => {
//   const [terms, setTerms] = useState<Term[]>([]);
//   const [busStops, setBusStops] = useState<BusStop[]>([]);
//   const [selectedTerm, setSelectedTerm] = useState<number | ''>('');
//   const [selectedSemester, setSelectedSemester] = useState<string>('');
//   const [selectedBusStop, setSelectedBusStop] = useState<string>('');
//   const [otherBusStop, setOtherBusStop] = useState<string>('');
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     // Fetch terms from backend
//     const fetchTerms = async () => {
//       try {
//         const response = await fetch('/v2/api/transport/terms'); // Replace with your API endpoint
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
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
//         const response = await fetch('/v2/api/transport/stops'); // Replace with your API endpoint
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

//     fetchTerms();
//     fetchBusStops();
//   }, []);

//   // Handle changes to the term selection
//   const handleTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const termId = parseInt(event.target.value, 10);
//     setSelectedTerm(termId);
//     const term = terms.find(t => t.id === termId);
//     setSelectedSemester(term?.sem || '');
//   };

//   // Handle changes to the semester selection
//   const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedSemester(event.target.value);
//   };

//   // Handle changes to the bus stop selection
//   const handleBusStopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedBusStop(event.target.value);
//   };

//   // Handle changes to the other bus stop input
//   const handleOtherBusStopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setOtherBusStop(event.target.value);
//   };

//   // Handle form submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const busStop = selectedBusStop === 'Others' ? otherBusStop : selectedBusStop;
//     if (!selectedTerm || !selectedSemester || !busStop) {
//       setError('Please select a term, semester, and bus stop.');
//       return;
//     }
//     setError('');

//     // Create the payload based on the schema
//     const payload = {
//       requestedStopName: busStop,
//       stopName: busStop,
//       termYear: `${terms.find(t => t.id === selectedTerm)?.startYear}-${terms.find(t => t.id === selectedTerm)?.endYear}`,
//       sem: selectedSemester
//     };

//     try {
//       const response = await fetch('/v2/api/transport/buspasses', { // Replace with your API endpoint
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       alert(`Bus pass requested successfully. Response: ${JSON.stringify(result)}`);
//       // Optionally, navigate to another page or clear form
//       setSelectedTerm('');
//       setSelectedSemester('');
//       setSelectedBusStop('');
//       setOtherBusStop('');
//     } catch (error) {
//       console.error('Error requesting bus pass:', error);
//       setError('There was an error requesting the bus pass. Please try again.');
//     }
//   };

//   // Extract terms for the dropdown
//   const termOptions = terms.map(term => ({
//     id: term.id,
//     label: `${term.startYear}-${term.endYear} (${term.sem})`
//   }));

//   // Filter semesters based on the selected term
//   const filteredSemesters = terms
//     .filter(term => term.id === selectedTerm)
//     .map(term => term.sem);

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Request a Bus Pass
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} noValidate>
//         <Box sx={{ mb: 2 }}>
//           <TextField
//             select
//             fullWidth
//             label="Select Term"
//             value={selectedTerm || ''}
//             onChange={handleTermChange}
//             required
//           >
//             <MenuItem value="" disabled>Select a term</MenuItem>
//             {termOptions.map(term => (
//               <MenuItem key={term.id} value={term.id}>
//                 {term.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Box>

//         {selectedTerm && (
//           <Box sx={{ mb: 2 }}>
//             <TextField
//               select
//               fullWidth
//               label="Select Semester"
//               value={selectedSemester}
//               onChange={handleSemesterChange}
//               required
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

//         <Box sx={{ mb: 2 }}>
//           <TextField
//             select
//             fullWidth
//             label="Select Bus Stop"
//             value={selectedBusStop}
//             onChange={handleBusStopChange}
//             required
//           >
//             <MenuItem value="" disabled>Select a bus stop</MenuItem>
//             {busStops.map(stop => (
//               <MenuItem key={stop.id} value={stop.id}>
//                 {stop.name}
//               </MenuItem>
//             ))}
//             <MenuItem value="Others">Others</MenuItem>
//           </TextField>
//         </Box>

//         {selectedBusStop === 'Others' && (
//           <Box sx={{ mb: 2 }}>
//             <TextField
//               fullWidth
//               label="Specify Bus Stop"
//               value={otherBusStop}
//               onChange={handleOtherBusStopChange}
//               required
//             />
//           </Box>
//         )}

//         {error && (
//           <Typography variant="body2" color="error" sx={{ mt: 1 }}>
//             {error}
//           </Typography>
//         )}

//         <Button type="submit" variant="contained" color="primary">
//           Request Bus Pass
//         </Button>
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
  startYear: number;
  endYear: number;
  sem: string;
}

interface BusStop {
  id: string;
  address: string;
}

const otpt = sessionStorage.getItem('otptoken');
const BusPassRequest: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<number | ''>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedBusStop, setSelectedBusStop] = useState<string>('');
  const [otherBusStop, setOtherBusStop] = useState<string>('');
  const [error, setError] = useState<string>('');

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

    fetchTerms();
    fetchBusStops();
  }, []);

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
    setSelectedBusStop(event.target.value);
  };

  // Handle changes to the other bus stop input
  const handleOtherBusStopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherBusStop(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let payload;

    if (selectedBusStop === 'Others') {
      // Payload for other bus stop
      payload = {
        requestedStopName: otherBusStop,
        termYear: `${terms.find(t => t.id === selectedTerm)?.startYear}-${terms.find(t => t.id === selectedTerm)?.endYear}`,
        sem: selectedSemester
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
        termYear: `${terms.find(t => t.id === selectedTerm)?.startYear}-${terms.find(t => t.id === selectedTerm)?.endYear}`,
        sem: selectedSemester
      };
    }

    if (!selectedTerm || !selectedSemester || !payload) {
      setError('Please select a term, semester, and bus stop.');
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
      alert(`Bus pass requested successfully. Response: ${JSON.stringify(result)}`);
      // Optionally, navigate to another page or clear form
      setSelectedTerm('');
      setSelectedSemester('');
      setSelectedBusStop('');
      setOtherBusStop('');
    } catch (error) {
      console.error('Error requesting bus pass:', error);
      setError('There was an error requesting the bus pass. Please try again.');
    }
  };

  // Extract terms for the dropdown
  const termOptions = terms.map(term => ({
    id: term.id,
    label: `${term.startYear}-${term.endYear}`
  }));

  // Filter semesters based on the selected term
  const filteredSemesters = terms
    .filter(term => term.id === selectedTerm)
    .map(term => term.sem);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Request a Bus Pass
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Box sx={{ mb: 2 }}>
          <TextField
            select
            fullWidth
            label="Select Term"
            value={selectedTerm || ''}
            onChange={handleTermChange}
            required
          >
            <MenuItem value="" disabled>Select a term</MenuItem>
            {termOptions.map(term => (
              <MenuItem key={term.id} value={term.id}>
                {term.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {selectedTerm && (
          <Box sx={{ mb: 2 }}>
            <TextField
              select
              fullWidth
              label="Select Semester"
              value={selectedSemester}
              onChange={handleSemesterChange}
              required
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

        {selectedBusStop === 'Others' && (
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Specify Bus Stop"
              value={otherBusStop}
              onChange={handleOtherBusStopChange}
              required
            />
          </Box>
        )}

        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button type="submit" variant="contained" color="primary">
          Request Bus Pass
        </Button>
      </Box>
    </Container>
  );
};

export default BusPassRequest;
