// // import React, { useState } from 'react';
// // import {
// //   Container,
// //   TextField,
// //   MenuItem,
// //   Button,
// //   Typography,
// //   Box,
// // } from '@mui/material';

// // interface BusStop {
// //   id: string;
// //   name: string;
// // }

// // const busStops: BusStop[] = [
// //   { id: '1', name: 'Main Street' },
// //   { id: '2', name: 'Central Park' },
// //   { id: '3', name: 'University' },
// //   { id: '4', name: 'Airport' },
// // ];

// // const BusPassRequest: React.FC = () => {
// //   const [userName, setUserName] = useState('');
// //   const [userId, setUserId] = useState('');
// //   const [selectedBusStop, setSelectedBusStop] = useState('');

// //   const handleSubmit = (event: React.FormEvent) => {
// //     event.preventDefault();
// //     alert(`Bus Pass Requested:
// //       Name: ${userName}
// //       ID: ${userId}
// //       Bus Stop: ${selectedBusStop}`);
// //   };

// //   return (
// //     <Container maxWidth="sm" sx={{ mt: 4 }}>
// //       <Typography variant="h4" gutterBottom>
// //         Request a Bus Pass
// //       </Typography>
// //       <Box component="form" onSubmit={handleSubmit} noValidate>
// //         <Box sx={{ mb: 2 }}>
// //           <TextField
// //             fullWidth
// //             label="Name"
// //             value={userName}
// //             onChange={(e) => setUserName(e.target.value)}
// //             required
// //           />
// //         </Box>
// //         <Box sx={{ mb: 2 }}>
// //           <TextField
// //             fullWidth
// //             label="ID"
// //             value={userId}
// //             onChange={(e) => setUserId(e.target.value)}
// //             required
// //           />
// //         </Box>
// //         <Box sx={{ mb: 2 }}>
// //           <TextField
// //             select
// //             fullWidth
// //             label="Bus Stop"
// //             value={selectedBusStop}
// //             onChange={(e) => setSelectedBusStop(e.target.value)}
// //             required
// //           >
// //             <MenuItem value="" disabled>
// //               Select a bus stop
// //             </MenuItem>
// //             {busStops.map((stop) => (
// //               <MenuItem key={stop.id} value={stop.name}>
// //                 {stop.name}
// //               </MenuItem>
// //             ))}
// //           </TextField>
// //         </Box>
// //         <Button type="submit" variant="contained" color="primary">
// //           Request Bus Pass
// //         </Button>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default BusPassRequest;

// import React, { useState } from 'react';
// import {
//   Container,
//   TextField,
//   MenuItem,
//   Button,
//   Typography,
//   Box
// } from '@mui/material';

// interface BusStop {
//   id: string;
//   name: string;
// }

// const busStops: BusStop[] = [
//   { id: '1', name: 'Main Street' },
//   { id: '2', name: 'Central Park' },
//   { id: '3', name: 'University' },
//   { id: '4', name: 'Airport' }
// ];

// const BusPassRequest: React.FC = () => {
//   const [userId, setUserId] = useState('');
//   const [selectedBusStop, setSelectedBusStop] = useState('');
//   const [otherBusStop, setOtherBusStop] = useState('');

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     const busStop =
//       selectedBusStop === 'Others' ? otherBusStop : selectedBusStop;
//     alert(`Bus Pass Requested:
//       ID: ${userId}
//       Bus Stop: ${busStop}`);
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Request a Bus Pass
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} noValidate>
//         <Box sx={{ mb: 2 }}>
//           <TextField
//             fullWidth
//             label="ID"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             required
//           />
//         </Box>
//         <Box sx={{ mb: 2 }}>
//           <TextField
//             select
//             fullWidth
//             label="Bus Stop"
//             value={selectedBusStop}
//             onChange={(e) => setSelectedBusStop(e.target.value)}
//             required
//           >
//             <MenuItem value="" disabled>
//               Select a bus stop
//             </MenuItem>
//             {busStops.map((stop) => (
//               <MenuItem key={stop.id} value={stop.name}>
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
//               label="Other Bus Stop"
//               value={otherBusStop}
//               onChange={(e) => setOtherBusStop(e.target.value)}
//               required
//             />
//           </Box>
//         )}
//         <Button type="submit" variant="contained" color="primary">
//           Request Bus Pass
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default BusPassRequest;



// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   TextField,
//   MenuItem,
//   Button,
//   Typography,
//   Box
// } from '@mui/material';

// interface BusStop {
//   id: string;
//   name: string;
// }

// const busStops: BusStop[] = [
//   { id: '1', name: 'Main Street' },
//   { id: '2', name: 'Central Park' },
//   { id: '3', name: 'University' },
//   { id: '4', name: 'Airport' }
// ];

// const semesters = ['Sem 1', 'Sem 2'];

// const generateTermYears = (startYear: number, numberOfYears: number) => {
//   const termYears = [];
//   for (let i = 0; i < numberOfYears; i++) {
//     const endYear = startYear + 1;
//     termYears.push(`${startYear}-${endYear}`);
//     startYear++;
//   }
//   return termYears;
// };

// const BusPassRequest: React.FC = () => {
//   const [selectedTerm, setSelectedTerm] = useState('');
//   const [selectedSemester, setSelectedSemester] = useState('');
//   const [selectedBusStop, setSelectedBusStop] = useState('');
//   const [otherBusStop, setOtherBusStop] = useState('');
//   const [termYears, setTermYears] = useState<string[]>([]);

//   useEffect(() => {
//     const currentYear = new Date().getFullYear();
//     const generatedTermYears = generateTermYears(currentYear, 5);
//     setTermYears(generatedTermYears);
//   }, []);

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     const busStop =
//       selectedBusStop === 'Others' ? otherBusStop : selectedBusStop;
//     alert(`Bus Pass Requested:
//       Term: ${selectedTerm}
//       Semester: ${selectedSemester}
//       Bus Stop: ${busStop}`);
//   };

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
//             label="Term ID"
//             value={selectedTerm}
//             onChange={(e) => setSelectedTerm(e.target.value)}
//             required
//           >
//             <MenuItem value="" disabled>
//               Select a term
//             </MenuItem>
//             {termYears.map((year) => (
//               <MenuItem key={year} value={year}>
//                 {year}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Box>
//         {selectedTerm && (
//           <Box sx={{ mb: 2 }}>
//             <TextField
//               select
//               fullWidth
//               label="Semester"
//               value={selectedSemester}
//               onChange={(e) => setSelectedSemester(e.target.value)}
//               required
//             >
//               <MenuItem value="" disabled>
//                 Select a semester
//               </MenuItem>
//               {semesters.map((semester) => (
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
//             label="Bus Stop"
//             value={selectedBusStop}
//             onChange={(e) => setSelectedBusStop(e.target.value)}
//             required
//           >
//             <MenuItem value="" disabled>
//               Select a bus stop
//             </MenuItem>
//             {busStops.map((stop) => (
//               <MenuItem key={stop.id} value={stop.name}>
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
//               label="Other Bus Stop"
//               value={otherBusStop}
//               onChange={(e) => setOtherBusStop(e.target.value)}
//               required
//             />
//           </Box>
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
  termId: number;
  startYear: string;
  endYear: string;
  semester: string;
}

const busStops = [
  { id: '1', name: 'Main Street' },
  { id: '2', name: 'Central Park' },
  { id: '3', name: 'University' },
  { id: '4', name: 'Airport' }
];

const BusPassRequest: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [selectedTermYear, setSelectedTermYear] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedBusStop, setSelectedBusStop] = useState<string>('');
  const [otherBusStop, setOtherBusStop] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Example terms - replace with actual data fetching if needed
    const fetchedTerms: Term[] = [
      { termId: 1, startYear: '2023', endYear: '2024', semester: 'Odd' },
      { termId: 1, startYear: '2023', endYear: '2024', semester: 'Even' },
      { termId: 2, startYear: '2024', endYear: '2025', semester: 'Odd' },
      { termId: 2, startYear: '2024', endYear: '2025', semester: 'Even' }
    ];
    setTerms(fetchedTerms);
  }, []);

  const handleTermYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const termYear = event.target.value;
    setSelectedTermYear(termYear);
    setSelectedSemester(''); // Reset semester when term year changes
  };

  const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSemester(event.target.value);
  };

  const handleBusStopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBusStop(event.target.value);
  };

  const handleOtherBusStopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherBusStop(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const busStop = selectedBusStop === 'Others' ? otherBusStop : selectedBusStop;
    if (!selectedTermYear || !selectedSemester || !busStop) {
      setError('Please select term year, semester, and bus stop.');
      return;
    }
    setError('');
    alert(`Bus Pass Requested:
      Term Year: ${selectedTermYear}
      Semester: ${selectedSemester}
      Bus Stop: ${busStop}`);
  };

  // Extract years and semesters based on the selected term year
  const termYearOptions = [...new Set(terms.map(term => `${term.startYear}-${term.endYear}`))];
  const filteredSemesters = terms
    .filter(term => `${term.startYear}-${term.endYear}` === selectedTermYear)
    .map(term => term.semester);

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
            label="Select Term Year"
            value={selectedTermYear}
            onChange={handleTermYearChange}
            required
          >
            <MenuItem value="" disabled>Select a term year</MenuItem>
            {termYearOptions.map(termYear => (
              <MenuItem key={termYear} value={termYear}>
                {termYear}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {selectedTermYear && (
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
                {stop.name}
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
