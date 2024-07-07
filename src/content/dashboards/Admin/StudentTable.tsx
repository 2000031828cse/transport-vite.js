import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

const data = [
  { reqId: 1, studentName: 'John Doe' },
  { reqId: 2, studentName: 'Jane Smith' },
  { reqId: 3, studentName: 'Alice Johnson' },
  { reqId: 4, studentName: 'Chris Lee' },
  { reqId: 5, studentName: 'Chris Gayle' }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid rgba(224, 224, 224, 1)'
}));

function StudentTable() {
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={3} // Adjusted spacing to match WatchListColumn
        justifyContent="center" // Center align the grid items horizontally
      >
        <Grid item xs={14}>
          {' '}
          <Card>
            <CardContent>
              <Typography variant="h1" gutterBottom>
                Student Requests
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Req Id</StyledTableCell>
                    <StyledTableCell>Student Name</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.reqId}>
                      <StyledTableCell>{row.reqId}</StyledTableCell>
                      <StyledTableCell>{row.studentName}</StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default StudentTable;
