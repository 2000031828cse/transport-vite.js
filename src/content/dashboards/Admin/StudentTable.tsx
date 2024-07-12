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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid rgba(224, 224, 224, 1)'
}));

const StudentTable = ({ studentRequests }) => {
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={3}
        justifyContent="center"
      >
        <Grid item xs={12}>
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
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Stop Name</StyledTableCell>
                    <StyledTableCell>Route Name</StyledTableCell>
                    <StyledTableCell>Created At</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentRequests.map((row) => (
                    <TableRow key={row.id}>
                      <StyledTableCell>{row.id}</StyledTableCell>
                      <StyledTableCell>{row.student.name}</StyledTableCell>
                      <StyledTableCell>{row.status}</StyledTableCell>
                      <StyledTableCell>{row.requestStopName}</StyledTableCell>
                      <StyledTableCell>{row.routeName}</StyledTableCell>
                      <StyledTableCell>{new Date(row.createdAt).toLocaleString()}</StyledTableCell>
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
