import React, { useState } from 'react';
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
  termId: number;
  startYear: string;
  endYear: string;
  semester: string;
}

const TermPage: React.FC = () => {
  const initialTerm: Term = {
    termId: 1,
    startYear: '',
    endYear: '',
    semester: 'Odd'
  };

  const [terms, setTerms] = useState<Term[]>([]);
  const [newTerm, setNewTerm] = useState<Term>({ ...initialTerm });
  const [error, setError] = useState<string>('');

  const isValidYear = (year: string) => /^\d{4}$/.test(year);

  const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartYear = e.target.value;
    setNewTerm((prevTerm) => ({
      ...prevTerm,
      startYear: newStartYear
    }));
    setError('');
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndYear = e.target.value;
    setNewTerm((prevTerm) => ({
      ...prevTerm,
      endYear: newEndYear
    }));
    setError('');
  };

  const handleSemesterChange = (e: SelectChangeEvent<string>) => {
    const newSemester = e.target.value as string;
    setNewTerm((prevTerm) => ({
      ...prevTerm,
      semester: newSemester
    }));
  };

  const isDuplicateTerm = (term: Term) => {
    return terms.some(
      (existingTerm) =>
        existingTerm.startYear === term.startYear &&
        existingTerm.endYear === term.endYear &&
        existingTerm.semester === term.semester
    );
  };

  const handleCreateTerm = () => {
    if (!newTerm.startYear || !newTerm.endYear || !newTerm.semester) {
      setError('Please select start year, end year, and semester.');
      return;
    }

    if (!isValidYear(newTerm.startYear)) {
      setError('Start year must be a valid 4-digit year.');
      return;
    }

    if (!isValidYear(newTerm.endYear)) {
      setError('End year must be a valid 4-digit year.');
      return;
    }

    if (parseInt(newTerm.endYear) < parseInt(newTerm.startYear)) {
      setError('End year cannot be before start year.');
      return;
    }

    if (parseInt(newTerm.endYear) > parseInt(newTerm.startYear) + 1) {
      setError('End year cannot exceed start year by more than one year.');
      return;
    }

    if (isDuplicateTerm(newTerm)) {
      setError('This term already exists.');
      return;
    }

    setTerms((prevTerms) => [
      ...prevTerms,
      { ...newTerm, termId: prevTerms.length + 1 }
    ]);
    setNewTerm({ ...initialTerm, termId: terms.length + 2 });
    setError('');
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
          Term ID: {newTerm.termId}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ minWidth: '100px', pr: 2 }}>
            Start Year:
          </Typography>
          <TextField
            type="text"
            value={newTerm.startYear}
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
            type="text"
            value={newTerm.endYear}
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
            value={newTerm.semester}
            onChange={handleSemesterChange}
            fullWidth
          >
            <MenuItem value="Odd">Odd</MenuItem>
            <MenuItem value="Even">Even</MenuItem>
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
              {terms.map((term) => (
                <TableRow key={term.termId}>
                  <TableCell>{term.termId}</TableCell>
                  <TableCell>{term.startYear}</TableCell>
                  <TableCell>{term.endYear}</TableCell>
                  <TableCell>{term.semester}</TableCell>
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
