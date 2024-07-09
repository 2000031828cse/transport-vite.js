import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';

interface Term {
  id: number;
  startYear: number | null;
  endYear: number | null;
  sem: string;
}

const TermPage: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [newTerm, setNewTerm] = useState<Term>({
    id: 1,
    startYear: null,
    endYear: null,
    sem: 'odd'
  });
  const [error, setError] = useState<string>('');

  const apiUrl = '/v2/api/transport'; // Replace with your actual API URL

  useEffect(() => {
    // Fetch existing terms from the API
    fetch(`${apiUrl}/terms`)
      .then(response => response.json())
      .then(data => {
        setTerms(data);
        // Set the next term id
        const nextId = data.length > 0 ? Math.max(...data.map((term: Term) => term.id)) + 1 : 1;
        setNewTerm(prevTerm => ({
          ...prevTerm,
          id: nextId
        }));
      })
      .catch(error => console.error('There was an error fetching the terms!', error));
  }, [apiUrl]);

  const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartYear = parseInt(e.target.value, 10);
    setNewTerm(prevTerm => ({
      ...prevTerm,
      startYear: isNaN(newStartYear) ? null : newStartYear
    }));
    setError('');
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndYear = parseInt(e.target.value, 10);
    setNewTerm(prevTerm => ({
      ...prevTerm,
      endYear: isNaN(newEndYear) ? null : newEndYear
    }));
    setError('');
  };

  const handleSemesterChange = (e: SelectChangeEvent<string>) => {
    const newSemester = e.target.value;
    setNewTerm(prevTerm => ({
      ...prevTerm,
      sem: newSemester
    }));
  };

  const isDuplicateTerm = (term: Term) => {
    return terms.some(
      (existingTerm) =>
        existingTerm.startYear === term.startYear &&
        existingTerm.endYear === term.endYear &&
        existingTerm.sem === term.sem
    );
  };

  const handleCreateTerm = () => {
    if (newTerm.startYear === null || newTerm.endYear === null || !newTerm.sem) {
      setError('Please select start year, end year, and semester.');
      return;
    }

    if (newTerm.startYear.toString().length !== 4) {
      setError('Start year must be a valid 4-digit year.');
      return;
    }

    if (newTerm.endYear.toString().length !== 4) {
      setError('End year must be a valid 4-digit year.');
      return;
    }

    if (newTerm.endYear < newTerm.startYear) {
      setError('End year cannot be before start year.');
      return;
    }

    if (newTerm.endYear > newTerm.startYear + 1) {
      setError('End year cannot exceed start year by more than one year.');
      return;
    }

    if (isDuplicateTerm(newTerm)) {
      setError('This term already exists.');
      return;
    }

    const otpt = sessionStorage.getItem('otptoken');

    // Send a POST request to create a new term
    fetch(`${apiUrl}/terms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${otpt}`
      },
      body: JSON.stringify(newTerm),
    })
      .then(response => response.json())
      .then(data => {
        setTerms(prevTerms => [
          ...prevTerms,
          { ...newTerm, id: data.id }
        ]);
        setNewTerm(prevTerm => ({
          id: prevTerm.id + 1,
          startYear: null,
          endYear: null,
          sem: 'odd'
        }));
        setError('');
      })
      .catch(error => {
        setError('There was an error creating the term!');
        console.error('There was an error creating the term!', error);
      });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        p: 2,
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}
    >
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        Term Details
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Term ID: {newTerm.id}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ minWidth: '100px', pr: 2 }}>
            Start Year:
          </Typography>
          <TextField
            type="number"
            value={newTerm.startYear !== null ? newTerm.startYear : ''}
            onChange={handleStartYearChange}
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 4 }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ minWidth: '100px', pr: 2 }}>
            End Year:
          </Typography>
          <TextField
            type="number"
            value={newTerm.endYear !== null ? newTerm.endYear : ''}
            onChange={handleEndYearChange}
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 4 }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ minWidth: '100px', pr: 2 }}>
            Semester:
          </Typography>
          <Select
            value={newTerm.sem}
            onChange={handleSemesterChange}
            fullWidth
          >
            <MenuItem value="odd">Odd</MenuItem>
            <MenuItem value="even">Even</MenuItem>
          </Select>
        </Box>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateTerm}
        sx={{ mb: 2 }}
      >
        Create Term
      </Button>

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Term Periods
        </Typography>
        {terms.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Term ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Start Year</strong>
                </TableCell>
                <TableCell>
                  <strong>End Year</strong>
                </TableCell>
                <TableCell>
                  <strong>Semester</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {terms.map(term => (
                <TableRow key={term.id}>
                  <TableCell>{term.id}</TableCell>
                  <TableCell>{term.startYear}</TableCell>
                  <TableCell>{term.endYear}</TableCell>
                  <TableCell>{term.sem}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No terms created yet.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default TermPage;
