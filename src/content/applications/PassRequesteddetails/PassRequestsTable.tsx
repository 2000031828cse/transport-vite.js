// import React, { FC, useState, ChangeEvent } from 'react';
// import {
//   Tooltip,
//   Divider,
//   Box,
//   FormControl,
//   InputLabel,
//   Card,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TableContainer,
//   Select,
//   MenuItem,
//   Typography,
//   useTheme,
//   CardHeader,
//   SelectChangeEvent
// } from '@mui/material';

// import Label from 'src/components/Label';
// import { PassOrder, PassOrderStatus } from 'src/models/pass_request';
// import CheckIcon from '@mui/icons-material/Check';

// // Import the ApprovalDialog component
// import ApprovalDialog from './DialogueBox';

// interface PassRequestsTableProps {
//   className?: string;
//   PassOrders: PassOrder[];
// }

// interface Filters {
//   status?: PassOrderStatus | null;
//   paymentStatus?: 'paid' | 'not paid' | null;
// }

// const getStatusLabel = (PassOrderStatus: PassOrderStatus): JSX.Element => {
//   const map = {
//     rejected: {
//       text: 'Rejected',
//       color: 'error'
//     },
//     completed: {
//       text: 'Approved',
//       color: 'info'
//     },
//     pending: {
//       text: 'Pending',
//       color: 'warning'
//     },
//     active: {
//       text: 'Active',
//       color: 'success'
//     }
//   };

//   const { text, color }: any = map[PassOrderStatus];

//   return <Label color={color}>{text}</Label>;
// };

// const applyFilters = (
//   PassOrders: PassOrder[],
//   filters: Filters
// ): PassOrder[] => {
//   return PassOrders.filter((PassOrder) => {
//     let matches = true;

//     if (filters.status && PassOrder.status !== filters.status) {
//       matches = false;
//     }

//     if (
//       filters.paymentStatus &&
//       PassOrder.paymentStatus !== filters.paymentStatus
//     ) {
//       matches = false;
//     }

//     return matches;
//   });
// };

// const applyPagination = (
//   PassOrders: PassOrder[],
//   page: number,
//   limit: number
// ): PassOrder[] => {
//   return PassOrders.slice(page * limit, page * limit + limit);
// };

// const PassRequestsTable: FC<PassRequestsTableProps> = ({ PassOrders }) => {
//   const [selectedPassOrders, setSelectedPassOrders] = useState<string[]>([]);
//   const [page, setPage] = useState<number>(0);
//   const [limit, setLimit] = useState<number>(5);
//   const [filters, setFilters] = useState<Filters>({
//     status: null,
//     paymentStatus: null
//   });
//   const [orders, setOrders] = useState<PassOrder[]>(PassOrders);

//   // State for managing dialog
//   const [dialogOpen, setDialogOpen] = useState<boolean>(false);
//   const [currentOrder, setCurrentOrder] = useState<PassOrder | null>(null);

//   // Function to handle opening and closing dialog
//   const handleDialogOpen = (order: PassOrder) => {
//     setCurrentOrder(order);
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setCurrentOrder(null);
//   };

//   // Function to handle approval link click
//   const handleApprovalClick = (
//     event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
//     order: PassOrder
//   ) => {
//     event.preventDefault();
//     handleDialogOpen(order);
//   };

//   const handleSelectOnePassOrder = (
//     event: ChangeEvent<HTMLInputElement>,
//     PassOrderId: string
//   ): void => {
//     if (!selectedPassOrders.includes(PassOrderId)) {
//       setSelectedPassOrders((prevSelected) => [...prevSelected, PassOrderId]);
//     } else {
//       setSelectedPassOrders((prevSelected) =>
//         prevSelected.filter((id) => id !== PassOrderId)
//       );
//     }
//   };

//   const handlePageChange = (event: any, newPage: number): void => {
//     setPage(newPage);
//   };

//   const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
//     setLimit(parseInt(event.target.value));
//   };

//   const handlePaymentStatusChangeForOrder = (
//     event: SelectChangeEvent<string>,
//     PassOrderId: string
//   ): void => {
//     const newStatus = event.target.value as 'paid' | 'not paid';
//     setOrders((prevOrders) =>
//       prevOrders.map((order) => {
//         if (order.id === PassOrderId) {
//           if (newStatus === 'paid' && order.status === 'completed') {
//             return { ...order, paymentStatus: newStatus, status: 'active' };
//           }
//           return { ...order, paymentStatus: newStatus };
//         }
//         return order;
//       })
//     );
//   };

//   const handleApprovalUpdate = (status: PassOrderStatus) => {
//     if (currentOrder) {
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === currentOrder.id ? { ...order, status } : order
//         )
//       );
//       handleDialogClose();
//     }
//   };

//   const filteredPassOrders = applyFilters(orders, filters);
//   const paginatedPassOrders = applyPagination(filteredPassOrders, page, limit);
//   const selectedSomePassOrders =
//     selectedPassOrders.length > 0 &&
//     selectedPassOrders.length < PassOrders.length;
//   const selectedAllPassOrders = selectedPassOrders.length === PassOrders.length;
//   const theme = useTheme();

//   const statusOptions = [
//     {
//       id: 'all',
//       name: 'All'
//     },
//     {
//       id: 'completed',
//       name: 'Approved'
//     },
//     {
//       id: 'pending',
//       name: 'Pending'
//     },
//     {
//       id: 'rejected',
//       name: 'Rejected'
//     },
//     {
//       id: 'active',
//       name: 'Active'
//     }
//   ];

//   const handleStatusChange = (event: SelectChangeEvent<string>): void => {
//     let value = null;

//     if (event.target.value !== 'all') {
//       value = event.target.value as PassOrderStatus;
//     }

//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       status: value
//     }));
//   };

//   const handlePaymentStatusChange = (
//     event: SelectChangeEvent<string>
//   ): void => {
//     let value = null;

//     if (event.target.value !== 'all') {
//       value = event.target.value as 'paid' | 'not paid';
//     }

//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       paymentStatus: value
//     }));
//   };

//   return (
//     <Card>
//       <CardHeader
//         action={
//           <Box display="flex" gap={2}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Status</InputLabel>
//               <Select
//                 value={filters.status || 'all'}
//                 onChange={handleStatusChange}
//                 label="Status"
//                 autoWidth
//               >
//                 {statusOptions.map((statusOption) => (
//                   <MenuItem key={statusOption.id} value={statusOption.id}>
//                     {statusOption.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//         }
//         title={
//           <Typography variant="h5" align="center">
//             Recent Orders
//           </Typography>
//         }
//       />
//       <Divider />
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {/* <TableCell>ID</TableCell> */}
//               <TableCell>Student ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Stop Request</TableCell>
//               <TableCell>Payment Status</TableCell>
//               <TableCell>Actions</TableCell>
//               <TableCell align="left">Approval Status</TableCell>
//               <TableCell>Update</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedPassOrders.map((PassOrder) => (
//               <TableRow key={PassOrder.orderID}>
//                 {/* <TableCell>{PassOrder.orderID}</TableCell> */}
//                 <TableCell>{PassOrder.Studentid}</TableCell>
//                 <TableCell>{PassOrder.studentName}</TableCell>
//                 <TableCell>{PassOrder.Stop}</TableCell>
//                 <TableCell align="left">
//                   <Select
//                     value={PassOrder.paymentStatus}
//                     onChange={(event: SelectChangeEvent<string>) =>
//                       handlePaymentStatusChangeForOrder(event, PassOrder.id)
//                     }
//                   >
//                     <MenuItem value="paid">Paid</MenuItem>
//                     <MenuItem value="not paid">Not Paid</MenuItem>
//                   </Select>
//                 </TableCell>
//                 <TableCell align="left">
//                   <Typography variant="body1" color="text.primary">
//                     <a
//                       href="#"
//                       onClick={(event) => handleApprovalClick(event, PassOrder)}
//                     >
//                       Approval
//                     </a>
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="center">
//                   {getStatusLabel(PassOrder.status)}
//                 </TableCell>
//                 <TableCell align="center">
//                   <Tooltip title="Update Status" arrow>
//                     <IconButton
//                       sx={{
//                         '&:hover': {
//                           background: theme.colors.primary.lighter
//                         },
//                         color: theme.palette.primary.main
//                       }}
//                       color="inherit"
//                       size="small"
//                     >
//                       <CheckIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box p={2}>
//         <TablePagination
//           component="div"
//           count={filteredPassOrders.length}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleLimitChange}
//           page={page}
//           rowsPerPage={limit}
//           rowsPerPageOptions={[5, 10, 25, 30]}
//         />
//       </Box>

//       {/* ApprovalDialog component integrated here */}
//       <ApprovalDialog
//         open={dialogOpen}
//         onClose={handleDialogClose}
//         onSave={handleApprovalUpdate}
//       />
//     </Card>
//   );
// };

// export default PassRequestsTable;

// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Box,
//   Typography
// } from '@mui/material';

// interface BusPassRequest {
//   id: number;
//   userId: number;
//   termId: number;
//   status: string;
//   stopId: number;
//   buspassId: number | null;
//   requestStopName: string;
//   assignedStop: string | null;
//   renewalStatus: boolean;
//   feeStatus: boolean;
//   routeId: number | null;
//   routeName: string | null;
//   updatedAt: string;
//   createdAt: string;
// }

// const otpt = sessionStorage.getItem('otptoken');

// const PassRequestsTable: React.FC = () => {
//   const [requests, setRequests] = useState<BusPassRequest[]>([]);
//   const [selectedStatus, setSelectedStatus] = useState<{ [key: number]: string }>({});
//   const [selectedFeeStatus, setSelectedFeeStatus] = useState<{ [key: number]: boolean }>({});
//   const [selectedAssignedStop, setSelectedAssignedStop] = useState<{ [key: number]: string }>({});

//   useEffect(() => {
//     // Fetch bus pass requests from backend
//     const fetchRequests = async () => {
//       try {
//         const response = await fetch('/v2/api/transport/buspasses', {
//           headers: {
//             'Authorization': `Bearer ${otpt}`
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const fetchedRequests: BusPassRequest[] = await response.json();
//         setRequests(fetchedRequests);
//       } catch (error) {
//         console.error('Error fetching bus pass requests:', error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleStatusChange = (id: number, status: string) => {
//     setSelectedStatus((prev) => ({ ...prev, [id]: status }));
//   };

//   const handleFeeStatusChange = (id: number, feeStatus: boolean) => {
//     setSelectedFeeStatus((prev) => ({ ...prev, [id]: feeStatus }));
//   };

//   const handleAssignedStopChange = (id: number, assignedStop: string) => {
//     setSelectedAssignedStop((prev) => ({ ...prev, [id]: assignedStop }));
//   };

//   const handleUpdate = async (request: BusPassRequest) => {
//     const updatedRequest = {
//       ...request,
//       status: selectedStatus[request.id] || request.status,
//       feeStatus: selectedFeeStatus[request.id] || request.feeStatus,
//       assignedStop: selectedAssignedStop[request.id] || request.assignedStop,
//     };

//     try {
//       const response = await fetch(`/v2/api/transport/buspasses/${request.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${otpt}`
//         },
//         body: JSON.stringify(updatedRequest),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       alert(`Bus pass updated successfully. Response: ${JSON.stringify(result)}`);

//       // Update the state with the new data
//       setRequests((prev) =>
//         prev.map((req) => (req.id === request.id ? result : req))
//       );
//     } catch (error) {
//       console.error('Error updating bus pass request:', error);
//       alert('There was an error updating the bus pass request. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="lg">
//       <Typography variant="h4" gutterBottom>
//         Bus Pass Requests
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>User ID</TableCell>
//               <TableCell>Term ID</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Stop ID</TableCell>
//               <TableCell>Requested Stop</TableCell>
//               <TableCell>Assigned Stop</TableCell>
//               <TableCell>Renewal Status</TableCell>
//               <TableCell>Fee Status</TableCell>
//               <TableCell>Route ID</TableCell>
//               <TableCell>Route Name</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {requests.map((request) => (
//               <TableRow key={request.id}>
//                 <TableCell>{request.id}</TableCell>
//                 <TableCell>{request.userId}</TableCell>
//                 <TableCell>{request.termId}</TableCell>
//                 <TableCell>
//                   <FormControl fullWidth>
//                     <InputLabel>Status</InputLabel>
//                     <Select
//                       value={selectedStatus[request.id] || request.status}
//                       onChange={(e) => handleStatusChange(request.id, e.target.value)}
//                     >
//                       <MenuItem value="pending">Pending</MenuItem>
//                       <MenuItem value="approved">Approved</MenuItem>
//                       <MenuItem value="rejected">Rejected</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </TableCell>
//                 <TableCell>{request.stopId}</TableCell>
//                 <TableCell>{request.requestStopName}</TableCell>
//                 <TableCell>
//                   <TextField
//                     value={selectedAssignedStop[request.id] || request.assignedStop || ''}
//                     onChange={(e) => handleAssignedStopChange(request.id, e.target.value)}
//                     fullWidth
//                   />
//                 </TableCell>
//                 <TableCell>{request.renewalStatus ? 'Yes' : 'No'}</TableCell>
//                 <TableCell>
//                   <FormControl fullWidth>
//                     <InputLabel>Fee Status</InputLabel>
//                     <Select
//                       value={selectedFeeStatus[request.id] !== undefined ? selectedFeeStatus[request.id] : request.feeStatus}
//                       onChange={(e) => handleFeeStatusChange(request.id, e.target.value === 'true')}
//                     >
//                       <MenuItem value={true}>Paid</MenuItem>
//                       <MenuItem value={false}>Unpaid</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </TableCell>
//                 <TableCell>{request.routeId || '-'}</TableCell>
//                 <TableCell>{request.routeName || '-'}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="primary" onClick={() => handleUpdate(request)}>
//                     Update
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default PassRequestsTable;


  
// import React, { FC, useState, ChangeEvent } from 'react';
// import {
//   Tooltip,
//   Divider,
//   Box,
//   FormControl,
//   InputLabel,
//   Card,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TableContainer,
//   Select,
//   MenuItem,
//   Typography,
//   useTheme,
//   CardHeader,
//   SelectChangeEvent
// } from '@mui/material';
// import Label from 'src/components/Label';
// import { PassOrder, PassOrderStatus } from 'src/models/pass_request';
// import CheckIcon from '@mui/icons-material/Check';
// import ApprovalDialog from './DialogueBox';

// interface PassRequestsTableProps {
//   className?: string;
//   PassOrders: PassOrder[];
// }

// interface Filters {
//   status?: PassOrderStatus | null;
//   paymentStatus?: 'paid' | 'not paid' | null;
// }

// const getStatusLabel = (status: PassOrderStatus): JSX.Element => {
//   const map = {
//     rejected: {
//       text: 'Rejected',
//       color: 'error'
//     },
//     completed: {
//       text: 'Approved',
//       color: 'info'
//     },
//     pending: {
//       text: 'Pending',
//       color: 'warning'
//     },
//     active: {
//       text: 'Active',
//       color: 'success'
//     }
//   };

//   const { text, color }: any = map[status];
//   return <Label color={color}>{text}</Label>;
// };

// const applyFilters = (PassOrders: PassOrder[], filters: Filters): PassOrder[] => {
//   return PassOrders.filter((order) => {
//     let matches = true;

//     if (filters.status && order.status !== filters.status) {
//       matches = false;
//     }

//     if (filters.paymentStatus && order.paymentStatus !== filters.paymentStatus) {
//       matches = false;
//     }

//     return matches;
//   });
// };

// const applyPagination = (PassOrders: PassOrder[], page: number, limit: number): PassOrder[] => {
//   return PassOrders.slice(page * limit, page * limit + limit);
// };

// const PassRequestsTable: FC<PassRequestsTableProps> = ({ PassOrders }) => {
//   const [selectedPassOrders, setSelectedPassOrders] = useState<string[]>([]);
//   const [page, setPage] = useState<number>(0);
//   const [limit, setLimit] = useState<number>(5);
//   const [filters, setFilters] = useState<Filters>({
//     status: null,
//     paymentStatus: null
//   });
//   const [orders, setOrders] = useState<PassOrder[]>(PassOrders);

//   // State for managing dialog
//   const [dialogOpen, setDialogOpen] = useState<boolean>(false);
//   const [currentOrder, setCurrentOrder] = useState<PassOrder | null>(null);

//   // Function to handle opening and closing dialog
//   const handleDialogOpen = (order: PassOrder) => {
//     setCurrentOrder(order);
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setCurrentOrder(null);
//   };

//   // Function to handle approval link click
//   const handleApprovalClick = (
//     event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
//     order: PassOrder
//   ) => {
//     event.preventDefault();
//     handleDialogOpen(order);
//   };

//   const handleSelectOnePassOrder = (
//     event: ChangeEvent<HTMLInputElement>,
//     orderId: string
//   ): void => {
//     if (!selectedPassOrders.includes(orderId)) {
//       setSelectedPassOrders((prevSelected) => [...prevSelected, orderId]);
//     } else {
//       setSelectedPassOrders((prevSelected) =>
//         prevSelected.filter((id) => id !== orderId)
//       );
//     }
//   };

//   const handlePageChange = (event: any, newPage: number): void => {
//     setPage(newPage);
//   };

//   const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
//     setLimit(parseInt(event.target.value));
//   };

//   const handlePaymentStatusChangeForOrder = (
//     event: SelectChangeEvent<string>,
//     orderId: string
//   ): void => {
//     const newStatus = event.target.value as 'paid' | 'not paid';
//     setOrders((prevOrders) =>
//       prevOrders.map((order) => {
//         if (order.id === orderId) {
//           if (newStatus === 'paid' && order.status === 'completed') {
//             return { ...order, paymentStatus: newStatus, status: 'active' };
//           }
//           return { ...order, paymentStatus: newStatus };
//         }
//         return order;
//       })
//     );
//   };

//   const handleApprovalUpdate = async (status: PassOrderStatus) => {
//     if (currentOrder) {
//       try {
//         const response = await fetch(`/api/pass-orders/${currentOrder.id}`, {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ status })
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const updatedOrder: PassOrder = await response.json();

//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order.id === updatedOrder.id ? updatedOrder : order
//           )
//         );
//         handleDialogClose();
//       } catch (err) {
//         console.error('Failed to update order:', err);
//       }
//     }
//   };

//   const filteredPassOrders = applyFilters(orders, filters);
//   const paginatedPassOrders = applyPagination(filteredPassOrders, page, limit);
//   const selectedSomePassOrders =
//     selectedPassOrders.length > 0 &&
//     selectedPassOrders.length < PassOrders.length;
//   const selectedAllPassOrders = selectedPassOrders.length === PassOrders.length;
//   const theme = useTheme();

//   const statusOptions = [
//     {
//       id: 'all',
//       name: 'All'
//     },
//     {
//       id: 'completed',
//       name: 'Approved'
//     },
//     {
//       id: 'pending',
//       name: 'Pending'
//     },
//     {
//       id: 'rejected',
//       name: 'Rejected'
//     },
//     {
//       id: 'active',
//       name: 'Active'
//     }
//   ];

//   const handleStatusChange = (event: SelectChangeEvent<string>): void => {
//     let value = null;

//     if (event.target.value !== 'all') {
//       value = event.target.value as PassOrderStatus;
//     }

//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       status: value
//     }));
//   };

//   const handlePaymentStatusChange = (
//     event: SelectChangeEvent<string>
//   ): void => {
//     let value = null;

//     if (event.target.value !== 'all') {
//       value = event.target.value as 'paid' | 'not paid';
//     }

//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       paymentStatus: value
//     }));
//   };

//   return (
//     <Card>
//       <CardHeader
//         action={
//           <Box display="flex" gap={2}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Status</InputLabel>
//               <Select
//                 value={filters.status || 'all'}
//                 onChange={handleStatusChange}
//                 label="Status"
//                 autoWidth
//               >
//                 {statusOptions.map((statusOption) => (
//                   <MenuItem key={statusOption.id} value={statusOption.id}>
//                     {statusOption.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//         }
//         title={
//           <Typography variant="h5" align="center">
//             Recent Orders
//           </Typography>
//         }
//       />
//       <Divider />
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Student ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Stop Request</TableCell>
//               <TableCell>Payment Status</TableCell>
//               <TableCell>Actions</TableCell>
//               <TableCell align="left">Approval Status</TableCell>
//               <TableCell>Update</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedPassOrders.map((order) => (
//               <TableRow key={order.orderID}>
//                 <TableCell>{order.userId}</TableCell>
//                 <TableCell>{order.student?.name }</TableCell>
//                 <TableCell>{order.assignedStop }</TableCell>
//                 <TableCell align="left">
//                   <Select
//                     value={order.paymentStatus}
//                     onChange={(event: SelectChangeEvent<string>) =>
//                       handlePaymentStatusChangeForOrder(event, order.id)
//                     }
//                   >
//                     <MenuItem value="paid">Paid</MenuItem>
//                     <MenuItem value="not paid">Not Paid</MenuItem>
//                   </Select>
//                 </TableCell>
//                 <TableCell align="left">
//                   <Typography variant="body1" color="text.primary">
//                     <a
//                       href="#"
//                       onClick={(event) => handleApprovalClick(event, order)}
//                     >
//                       Approval
//                     </a>
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="center">
//                   {getStatusLabel(order.status)}
//                 </TableCell>
//                 <TableCell align="center">
//                   <Tooltip title="Update Status" arrow>
//                     <IconButton
//                       sx={{
//                         '&:hover': {
//                           background: theme.colors.primary.lighter
//                         },
//                         color: theme.palette.primary.main
//                       }}
//                       color="inherit"
//                       size="small"
//                     >
//                       <CheckIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box p={2}>
//         <TablePagination
//           component="div"
//           count={filteredPassOrders.length}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleLimitChange}
//           page={page}
//           rowsPerPage={limit}
//           rowsPerPageOptions={[5, 10, 25, 30]}
//         />
//       </Box>

//       <ApprovalDialog
//         open={dialogOpen}
//         onClose={handleDialogClose}
//         onSave={handleApprovalUpdate}
//       />
//     </Card>
//   );
// };

// export default PassRequestsTable;


import React, { FC, useState, ChangeEvent } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  SelectChangeEvent
} from '@mui/material';
import Label from 'src/components/Label';
import { PassOrder, PassOrderStatus } from 'src/models/pass_request';
import CheckIcon from '@mui/icons-material/Check';
import ApprovalDialog from './DialogueBox';

interface PassRequestsTableProps {
  className?: string;
  PassOrders: PassOrder[];
}

interface Filters {
  status?: PassOrderStatus | null;
  paymentStatus?: 'paid' | 'not paid' | null;
}

const getStatusLabel = (status: PassOrderStatus): JSX.Element => {
  const map = {
    rejected: {
      text: 'Rejected',
      color: 'error'
    },
    completed: {
      text: 'Approved',
      color: 'info'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    },
    active: {
      text: 'Active',
      color: 'success'
    }
  };

  const { text, color }: any = map[status];
  return <Label color={color}>{text}</Label>;
};

const applyFilters = (PassOrders: PassOrder[], filters: Filters): PassOrder[] => {
  return PassOrders.filter((order) => {
    let matches = true;

    if (filters.status && order.status !== filters.status) {
      matches = false;
    }

    if (filters.paymentStatus && order.paymentStatus !== filters.paymentStatus) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (PassOrders: PassOrder[], page: number, limit: number): PassOrder[] => {
  return PassOrders.slice(page * limit, page * limit + limit);
};

const PassRequestsTable: FC<PassRequestsTableProps> = ({ PassOrders }) => {
  const [selectedPassOrders, setSelectedPassOrders] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
    paymentStatus: null
  });
  const [orders, setOrders] = useState<PassOrder[]>(PassOrders);

  // State for managing dialog
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<PassOrder | null>(null);

  // Function to handle opening and closing dialog
  const handleDialogOpen = (order: PassOrder) => {
    setCurrentOrder(order);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentOrder(null);
  };

  // Function to handle approval link click
  const handleApprovalClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    order: PassOrder
  ) => {
    event.preventDefault();
    handleDialogOpen(order);
  };

  const handleSelectOnePassOrder = (
    event: ChangeEvent<HTMLInputElement>,
    orderId: string
  ): void => {
    if (!selectedPassOrders.includes(orderId)) {
      setSelectedPassOrders((prevSelected) => [...prevSelected, orderId]);
    } else {
      setSelectedPassOrders((prevSelected) =>
        prevSelected.filter((id) => id !== orderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handlePaymentStatusChangeForOrder = async (
    event: SelectChangeEvent<string>,
    orderId: string
  ): Promise<void> => {
    const newStatus = event.target.value as 'paid' | 'not paid';
    try {
      const response = await fetch(`/api/pass-orders/${orderId}/payment-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentStatus: newStatus })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedOrder: PassOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    } catch (err) {
      console.error('Failed to update payment status:', err);
    }
  };

  const handleApprovalUpdate = async (status: PassOrderStatus) => {
    if (currentOrder) {
      try {
        const response = await fetch(`/api/pass-orders/${currentOrder.id}/approval-status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const updatedOrder: PassOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );
        handleDialogClose();
      } catch (err) {
        console.error('Failed to update order:', err);
      }
    }
  };

  const filteredPassOrders = applyFilters(orders, filters);
  const paginatedPassOrders = applyPagination(filteredPassOrders, page, limit);
  const selectedSomePassOrders =
    selectedPassOrders.length > 0 &&
    selectedPassOrders.length < PassOrders.length;
  const selectedAllPassOrders = selectedPassOrders.length === PassOrders.length;
  const theme = useTheme();

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Approved'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'rejected',
      name: 'Rejected'
    },
    {
      id: 'active',
      name: 'Active'
    }
  ];

  const handleStatusChange = (event: SelectChangeEvent<string>): void => {
    let value = null;

    if (event.target.value !== 'all') {
      value = event.target.value as PassOrderStatus;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePaymentStatusChange = (
    event: SelectChangeEvent<string>
  ): void => {
    let value = null;

    if (event.target.value !== 'all') {
      value = event.target.value as 'paid' | 'not paid';
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      paymentStatus: value
    }));
  };

  return (
    <Card>
      <CardHeader
        action={
          <Box display="flex" gap={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || 'all'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title={
          <Typography variant="h5" align="center">
            Recent Orders
          </Typography>
        }
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Stop Request</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell align="left">Approval Status</TableCell>
              <TableCell>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPassOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.userId}</TableCell>
                <TableCell>{order.student?.name }</TableCell>
                <TableCell>{order.assignedStop }</TableCell>
                <TableCell align="left">
                  <Select
                    value={order.paymentStatus}
                    onChange={(event: SelectChangeEvent<string>) =>
                      handlePaymentStatusChangeForOrder(event, order.id)
                    }
                  >
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="not paid">Not Paid</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body1" color="text.primary">
                  <a
                      href="#"
                      onClick={(event) => handleApprovalClick(event, order)}
                    >
                      Approval
                    </a>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {getStatusLabel(order.status)}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Update Status" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      color="inherit"
                      size="small"
                      onClick={() => {
                        if (order.status === 'completed' && order.paymentStatus === 'paid') {
                          handleApprovalUpdate('active');
                        } else if (order.status === 'pending') {
                          handleApprovalUpdate('completed');
                        }
                      }}
                    >
                      <CheckIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredPassOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>

      <ApprovalDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSave={handleApprovalUpdate}
      />
    </Card>
  );
};

export default PassRequestsTable;

                   
