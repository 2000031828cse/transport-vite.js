// import React, { FC, useState, ChangeEvent, useEffect } from "react";
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
//   SelectChangeEvent,
// } from "@mui/material";
// import Label from "src/components/Label";
// import { PassOrder, PassOrderStatus } from "src/models/pass_request";

// import CheckIcon from "@mui/icons-material/Check";
// import ApprovalDialog from "./DialogueBox";

// interface PassRequestsTableProps {
//   PassOrders: PassOrder[];
// }

// interface Filters {
//   status?: PassOrderStatus | null;
//   paymentStatus?: "paid" | "not paid" | null;
// }

// const getStatusLabel = (status: PassOrderStatus): JSX.Element => {
//   const statusMap: Record<
//     PassOrderStatus,
//     { text: string; color: "success" | "warning" | "error" | "info" }
//   > = {
//     pending: {
//       text: "Pending",
//       color: "warning",
//     },
//     approved: {
//       text: "Approved",
//       color: "info",
//     },
//     rejected: {
//       text: "Rejected",
//       color: "error",
//     },
//     active: {
//       text: "active",
//       color: "success",
//     },
//     inactive: {
//       text: "in-active",
//       color: "error",
//     },
//   };

//   const { text, color } = statusMap[status] || {
//     text: "Unknown",
//     color: "default",
//   };

//   return <Label color={color}>{text}</Label>;
// };

// const applyFilters = (
//   PassOrders: PassOrder[],
//   filters: Filters
// ): PassOrder[] => {
//   return PassOrders.filter((order) => {
//     let matches = true;

//     if (filters.status && order.status !== filters.status) {
//       matches = false;
//     }

//     if (
//       filters.paymentStatus &&
//       order.feeStatus !== (filters.paymentStatus === "paid")
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
//   const [selectedPassOrders, setSelectedPassOrders] = useState<number[]>([]);
//   const [page, setPage] = useState<number>(0);
//   const [limit, setLimit] = useState<number>(5);
//   const [filters, setFilters] = useState<Filters>({
//     status: null,
//     paymentStatus: null,
//   });
//   const [orders, setOrders] = useState<PassOrder[]>(PassOrders);
//   const [dialogOpen, setDialogOpen] = useState<boolean>(false);
//   const [currentOrder, setCurrentOrder] = useState<PassOrder | null>(null);

//   const otpt = sessionStorage.getItem("otptoken");

//   const handleDialogOpen = (order: PassOrder) => {
//     setCurrentOrder(order);
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setCurrentOrder(null);
//   };

//   const handleApprovalClick = (
//     event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
//     order: PassOrder
//   ) => {
//     event.preventDefault();
//     setCurrentOrder(order);
//     setDialogOpen(true);
//   };

//   const handlePageChange = (event: any, newPage: number): void => {
//     setPage(newPage);
//   };

//   const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
//     setLimit(parseInt(event.target.value, 10));
//   };

//   const handlePaymentStatusChangeForOrder = async (
//     event: SelectChangeEvent<string>,
//     orderId: number
//   ): Promise<void> => {
//     const newStatus = event.target.value as "paid" | "not paid";

//     // Determine the new status based on payment status
//     const updatedStatus = newStatus === "paid" ? "active" : "approved"; // Assuming approved if not paid

//     try {
//       // Update payment status and order status in a single call
//       const response = await fetch(`/v2/api/transport/buspasses/${orderId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${otpt}`,
//         },
//         body: JSON.stringify({
//           feeStatus: newStatus === "paid",
//           status: updatedStatus,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const updatedOrder: PassOrder = await response.json();
//       console.log("Order updated successfully:", updatedOrder);

//       // Update the state to reflect the changes
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === updatedOrder.id ? updatedOrder : order
//         )
//       );
//     } catch (error) {
//       console.error("Error updating order:", error);
//       alert("There was an error updating the order. Please try again.");
//     }
//   };
//   const handleApprovalUpdate = async (
//     status: PassOrderStatus,
//     routeName: string | null,
//     assignedStop: string | null,
//     busPassId: string // Change this from `orderId: number` to `busPassId: string`
//   ) => {
//     if (currentOrder) {
//       // Check if status is approved and validate required fields
//       if (
//         status === "approved" &&
//         (!routeName || !assignedStop || !busPassId)
//       ) {
//         console.error(
//           "Approval failed: routeName and assignedStop are required."
//         );
//         // Optionally, show an error message to the user
//         return;
//       }

//       try {
//         const response = await fetch(
//           `/v2/api/transport/buspasses/${currentOrder.id}`, // Use `busPassId` here
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${otpt}`,
//             },
//             body: JSON.stringify({
//               status,
//               routeName: status === "approved" ? routeName : undefined,
//               assignedStop: status === "approved" ? assignedStop : undefined,
//               buspassId: status === "approved" ? busPassId : undefined,
//             }),
//           }
//         );

//         if (!response.ok) {
//           const errorDetails = await response.text();
//           console.error("Failed to update order:", {
//             status: response.status,
//             statusText: response.statusText,
//             errorDetails,
//           });
//           throw new Error(`Failed to update order: ${response.statusText}`);
//         }

//         const updatedOrder: PassOrder = await response.json();

//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order.id === updatedOrder.id
//               ? {
//                   ...order,
//                   status: updatedOrder.status,
//                   routeName: updatedOrder.routeName,
//                   assignedStop: updatedOrder.assignedStop,
//                   requestStopName: updatedOrder.requestStopName,
//                   student: updatedOrder.student || order.student,
//                   buspassId: updatedOrder.buspassId,
//                 }
//               : order
//           )
//         );
//         handleDialogClose();
//       } catch (err) {
//         console.error("Failed to update order:", err);
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
//     { id: "all", name: "All" },
//     { id: "approved", name: "Approved" },
//     { id: "pending", name: "Pending" },
//     { id: "rejected", name: "Rejected" },
//     { id: "active", name: "Active" },
//     { id: "inactive", name: "In-Active" },
//   ];

//   const handleStatusChange = (event: SelectChangeEvent<string>): void => {
//     const value =
//       event.target.value !== "all"
//         ? (event.target.value as PassOrderStatus)
//         : null;

//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       status: value,
//     }));
//   };

//   const handlePaymentStatusChange = (
//     event: SelectChangeEvent<"paid" | "not paid">
//   ): void => {
//     const value =
//       event.target.value !== "all"
//         ? (event.target.value as "paid" | "not paid")
//         : null;

//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       paymentStatus: value,
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
//                 value={filters.status || "all"}
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
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Payment Status</InputLabel>
//               <Select
//                 value={filters.paymentStatus || "all"}
//                 onChange={handlePaymentStatusChange}
//                 label="Payment Status"
//                 autoWidth
//               >
//                 <MenuItem value="all">All</MenuItem>
//                 <MenuItem value="paid">Paid</MenuItem>
//                 <MenuItem value="not paid">Not Paid</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//         }
//         title={
//           <Typography variant="h5" align="left">
//             Bus Pass Requests
//           </Typography>
//         }
//       />
//       <Divider />
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>STUDENT ID</TableCell>
//               <TableCell>NAME</TableCell>
//               <TableCell>STOP REQUEST</TableCell>
//               <TableCell>PAYMENT STATUS</TableCell>
//               <TableCell>ACTIONS</TableCell>
//               <TableCell>APPROVAL STATUS</TableCell>
//               <TableCell>ROUTE NAME</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedPassOrders.map((order) => {
//               const isPassOrderSelected = selectedPassOrders.includes(order.id);
//               return (
//                 <TableRow hover key={order.id} selected={isPassOrderSelected}>
//                   <TableCell>
//                     <Typography variant="body1" noWrap>
//                       {order.userId}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="body1" noWrap>
//                       {order.student?.name || "No Name"}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="body1" noWrap>
//                       {order.assignedStop || order.requestStopName}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <FormControl variant="outlined" fullWidth>
//                       <Select
//                         value={order.feeStatus ? "paid" : "not paid"}
//                         onChange={(event) =>
//                           handlePaymentStatusChangeForOrder(event, order.id)
//                         }
//                       >
//                         <MenuItem value="paid">Paid</MenuItem>
//                         <MenuItem value="not paid">Not Paid</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </TableCell>
//                   <TableCell>
//                     <a
//                       href="#"
//                       onClick={(event) => handleApprovalClick(event, order)}
//                     >
//                       Approval
//                     </a>
//                   </TableCell>
//                   <TableCell>{getStatusLabel(order.status)}</TableCell>
//                   {/* <TableCell>
//                      <Tooltip title="Update" arrow>
//                       <IconButton
//                         size="small"
//                         color="primary"
//                         onClick={() => handleApprovalUpdate("approved", order.routeName, order.assignedStop,order.buspassId)}
//                       >
//                         <CheckIcon />
//                       </IconButton>
//                     </Tooltip> 
//                   </TableCell>*/}
//                   <TableCell>
//                     <Typography variant="body1" noWrap>
//                       {order.routeName}
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
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
//       {currentOrder && (
//         <ApprovalDialog
//           open={dialogOpen}
//           onClose={handleDialogClose}
//           onSave={handleApprovalUpdate}
//           order={currentOrder}
//         />
//       )}
//     </Card>
//   );
// };

// export default PassRequestsTable;

import React, { FC, useState, ChangeEvent, useEffect } from "react";
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
  CardHeader,
  SelectChangeEvent,
} from "@mui/material";
import Label from "src/components/Label";
import { PassOrder, PassOrderStatus } from "src/models/pass_request";

import CheckIcon from "@mui/icons-material/Check";
import ApprovalDialog from "./DialogueBox";

interface PassRequestsTableProps {
  PassOrders: PassOrder[];
}

interface Filters {
  status?: PassOrderStatus | null;
  paymentStatus?: "paid" | "not paid" | null;
  requestType?: string;
}

const getStatusLabel = (status: PassOrderStatus): JSX.Element => {
  const statusMap: Record<
    PassOrderStatus,
    { text: string; color: "success" | "warning" | "error" | "info" }
  > = {
    pending: {
      text: "Pending",
      color: "warning",
    },
    approved: {
      text: "Approved",
      color: "info",
    },
    rejected: {
      text: "Rejected",
      color: "error",
    },
    active: {
      text: "Active",
      color: "success",
    },
    inactive: {
      text: "Inactive",
      color: "error",
    },
  };

  const { text, color } = statusMap[status] || {
    text: "Unknown",
    color: "default",
  };

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  PassOrders: PassOrder[],
  filters: Filters
): PassOrder[] => {
  return PassOrders.filter((order) => {
    let matches = true;

    if (filters.status && order.status !== filters.status) {
      matches = false;
    }

    if (
      filters.paymentStatus &&
      order.feeStatus !== (filters.paymentStatus === "paid")
    ) {
      matches = false;
    }

    if (filters.requestType && order.requestType !== filters.requestType) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  PassOrders: PassOrder[],
  page: number,
  limit: number
): PassOrder[] => {
  return PassOrders.slice(page * limit, page * limit + limit);
};

const PassRequestsTable: FC<PassRequestsTableProps> = ({ PassOrders }) => {
  const [selectedPassOrders, setSelectedPassOrders] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
    paymentStatus: null,
    requestType: "New Bus Pass Request",
  });
  const [orders, setOrders] = useState<PassOrder[]>(PassOrders);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<PassOrder | null>(null);

  const otpt = sessionStorage.getItem("otptoken");

  const handleDialogOpen = (order: PassOrder) => {
    setCurrentOrder(order);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentOrder(null);
  };

  const handleApprovalClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    order: PassOrder
  ) => {
    event.preventDefault();
    setCurrentOrder(order);
    setDialogOpen(true);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  const handlePaymentStatusChangeForOrder = async (
    event: SelectChangeEvent<string>,
    orderId: number
  ): Promise<void> => {
    const newStatus = event.target.value as "paid" | "not paid";

    const updatedStatus = newStatus === "paid" ? "active" : "pending";

    try {
      const response = await fetch(`/v2/api/transport/buspasses/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otpt}`,
        },
        body: JSON.stringify({
          feeStatus: newStatus === "paid",
          status: updatedStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedOrder: PassOrder = await response.json();
      console.log("Order updated successfully:", updatedOrder);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
      alert("There was an error updating the order. Please try again.");
    }
  };

  const handleApprovalUpdate = async (
    status: PassOrderStatus,
    routeName: string | null,
    assignedStop: string | null,
    busPassId: string
  ) => {
    if (currentOrder) {
      if (
        status === "approved" &&
        (!routeName || !assignedStop || !busPassId)
      ) {
        console.error(
          "Approval failed: routeName and assignedStop are required."
        );
        return;
      }

      try {
        const response = await fetch(
          `/v2/api/transport/buspasses/${currentOrder.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${otpt}`,
            },
            body: JSON.stringify({
              status,
              routeName: status === "approved" ? routeName : undefined,
              assignedStop: status === "approved" ? assignedStop : undefined,
              buspassId: status === "approved" ? busPassId : undefined,
            }),
          }
        );

        if (!response.ok) {
          const errorDetails = await response.text();
          console.error("Failed to update order:", {
            status: response.status,
            statusText: response.statusText,
            errorDetails,
          });
          throw new Error(`Failed to update order: ${response.statusText}`);
        }

        const updatedOrder: PassOrder = await response.json();

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.id
              ? {
                  ...order,
                  status: updatedOrder.status,
                  routeName: updatedOrder.routeName,
                  assignedStop: updatedOrder.assignedStop,
                  requestStopName: updatedOrder.requestStopName,
                  student: updatedOrder.student || order.student,
                  buspassId: updatedOrder.buspassId,
                }
              : order
          )
        );
        handleDialogClose();
      } catch (err) {
        console.error("Failed to update order:", err);
      }
    }
  };

  const handleRequestTypeChange = (event: SelectChangeEvent<string>): void => {
    const requestType = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      requestType,
    }));
  };

  const filteredPassOrders = applyFilters(orders, filters);
  const paginatedPassOrders = applyPagination(filteredPassOrders, page, limit);

  return (
    <Card>
      <CardHeader
        action={
          <Box display="flex" gap={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Request Type</InputLabel>
              <Select
                value={filters.requestType || "New Bus Pass Request"}
                onChange={handleRequestTypeChange}
                label="Request Type"
                autoWidth
              >
                <MenuItem value="New Bus Pass Request">
                  New Bus Pass Request
                </MenuItem>
                <MenuItem value="Buspass Generation">Bus Pass Generation</MenuItem>
                <MenuItem value="Update the route">Update the Route</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || "all"}
                onChange={(event) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    status:
                      event.target.value !== "all"
                        ? (event.target.value as PassOrderStatus)
                        : null,
                  }))
                }
                label="Status"
                autoWidth
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Payment Status</InputLabel>
              <Select
                value={filters.paymentStatus || "all"}
                onChange={(event) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    paymentStatus:
                      event.target.value !== "all"
                        ? (event.target.value as "paid" | "not paid")
                        : null,
                  }))
                }
                label="Payment Status"
                autoWidth
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="not paid">Not Paid</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        title="Pass Requests"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Stop Name</TableCell>
              <TableCell>Route Name</TableCell>
              <TableCell>Pass Status</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPassOrders.map((order) => (
              <TableRow
                hover
                key={order.id}
                selected={selectedPassOrders.includes(order.id)}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight="bold" noWrap>
                    {order.student?.name || "N/A"}
                  </Typography>
                </TableCell>
                <TableCell>{order.requestStopName || "N/A"}</TableCell>
                <TableCell>{order.routeName || "N/A"}</TableCell>
                <TableCell>{getStatusLabel(order.status)}</TableCell>
                <TableCell>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      value={order.feeStatus ? "paid" : "not paid"}
                      onChange={(event) =>
                        handlePaymentStatusChangeForOrder(event, order.id)
                      }
                    >
                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="not paid">Not Paid</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Approve Order" arrow>
                    <IconButton
                      color="primary"
                      onClick={(event) =>
                        handleApprovalClick(event, order)
                      }
                    >
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredPassOrders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {currentOrder && (
        <ApprovalDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          onSave={handleApprovalUpdate}
          order={currentOrder}
        />
      )}
    </Card>
  );
};

export default PassRequestsTable;


// import React, { FC, useState, ChangeEvent } from "react";
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
//   SelectChangeEvent,
// } from "@mui/material";
// import Label from "src/components/Label";
// import { PassOrder, PassOrderStatus } from "src/models/pass_request";
// import CheckIcon from "@mui/icons-material/Check";
// import ApprovalDialog from "./DialogueBox";

// interface PassRequestsTableProps {
//   PassOrders: PassOrder[];
// }

// interface Filters {
//   status?: PassOrderStatus | null;
//   paymentStatus?: "paid" | "not paid" | null;
//   requestType?: string;
// }

// const getStatusLabel = (status: PassOrderStatus): JSX.Element => {
//   const statusMap: Record<
//     PassOrderStatus,
//     { text: string; color: "success" | "warning" | "error" | "info" }
//   > = {
//     pending: { text: "Pending", color: "warning" },
//     approved: { text: "Approved", color: "info" },
//     rejected: { text: "Rejected", color: "error" },
//     active: { text: "Active", color: "success" },
//     inactive: { text: "Inactive", color: "error" },
//   };

//   const { text, color } = statusMap[status] || {
//     text: "Unknown",
//     color: "default",
//   };

//   return <Label color={color}>{text}</Label>;
// };

// const applyFilters = (
//   PassOrders: PassOrder[],
//   filters: Filters
// ): PassOrder[] => {
//   return PassOrders.filter((order) => {
//     let matches = true;

//     if (filters.status && order.status !== filters.status) {
//       matches = false;
//     }

//     if (
//       filters.paymentStatus &&
//       order.feeStatus !== (filters.paymentStatus === "paid")
//     ) {
//       matches = false;
//     }

//     if (filters.requestType && order.requestType !== filters.requestType) {
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
//   const [selectedPassOrders, setSelectedPassOrders] = useState<number[]>([]);
//   const [page, setPage] = useState<number>(0);
//   const [limit, setLimit] = useState<number>(5);
//   const [filters, setFilters] = useState<Filters>({
//     status: null,
//     paymentStatus: null,
//     requestType: "New Bus Pass Request",
//   });
//   const [orders, setOrders] = useState<PassOrder[]>(PassOrders);
//   const [dialogOpen, setDialogOpen] = useState<boolean>(false);
//   const [currentOrder, setCurrentOrder] = useState<PassOrder | null>(null);

//   const otpt = sessionStorage.getItem("otptoken");

//   const handleDialogOpen = (order: PassOrder) => {
//     setCurrentOrder(order);
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setCurrentOrder(null);
//   };

//   const handleApprovalClick = (
//     event: React.MouseEvent<HTMLButtonElement>,
//     order: PassOrder
//   ) => {
//     event.preventDefault();
//     handleDialogOpen(order);
//   };

//   const handlePageChange = (event: any, newPage: number): void => {
//     setPage(newPage);
//   };

//   const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
//     setLimit(parseInt(event.target.value, 10));
//   };

//   const handlePaymentStatusChangeForOrder = async (
//     event: SelectChangeEvent<string>,
//     orderId: number
//   ): Promise<void> => {
//     const newStatus = event.target.value as "paid" | "not paid";

//     const updatedStatus = newStatus === "paid" ? "active" : "approved";

//     try {
//       const response = await fetch(`/v2/api/transport/buspasses/${orderId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${otpt}`,
//         },
//         body: JSON.stringify({
//           feeStatus: newStatus === "paid",
//           status: updatedStatus,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const updatedOrder: PassOrder = await response.json();

//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === updatedOrder.id ? updatedOrder : order
//         )
//       );
//     } catch (error) {
//       console.error("Error updating order:", error);
//       alert("There was an error updating the order. Please try again.");
//     }
//   };

//   const handleApprovalUpdate = async (
//     status: PassOrderStatus,
//     routeName: string | null,
//     assignedStop: string | null,
//     busPassId: string
//   ) => {
//     if (currentOrder) {
//       if (
//         status === "approved" &&
//         (!routeName || !assignedStop || !busPassId)
//       ) {
//         console.error(
//           "Approval failed: routeName and assignedStop are required."
//         );
//         return;
//       }

//       try {
//         const response = await fetch(
//           `/v2/api/transport/buspasses/${currentOrder.id}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${otpt}`,
//             },
//             body: JSON.stringify({
//               status,
//               routeName: status === "approved" ? routeName : undefined,
//               assignedStop: status === "approved" ? assignedStop : undefined,
//               buspassId: status === "approved" ? busPassId : undefined,
//             }),
//           }
//         );

//         if (!response.ok) {
//           const errorDetails = await response.text();
//           console.error("Failed to update order:", {
//             status: response.status,
//             statusText: response.statusText,
//             errorDetails,
//           });
//           throw new Error(`Failed to update order: ${response.statusText}`);
//         }

//         const updatedOrder: PassOrder = await response.json();

//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order.id === updatedOrder.id
//               ? {
//                   ...order,
//                   status: updatedOrder.status,
//                   routeName: updatedOrder.routeName,
//                   assignedStop: updatedOrder.assignedStop,
//                   requestStopName: updatedOrder.requestStopName,
//                   student: updatedOrder.student || order.student,
//                   buspassId: updatedOrder.buspassId,
//                 }
//               : order
//           )
//         );
//         handleDialogClose();
//       } catch (err) {
//         console.error("Failed to update order:", err);
//       }
//     }
//   };

//   const handleRequestTypeChange = (
//     event: SelectChangeEvent<string>
//   ): void => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       requestType: event.target.value,
//     }));
//   };

//   const filteredPassOrders = applyFilters(orders, filters);
//   const paginatedPassOrders = applyPagination(filteredPassOrders, page, limit);
//   const selectedSomePassOrders =
//     selectedPassOrders.length > 0 &&
//     selectedPassOrders.length < PassOrders.length;
//   const selectedAllPassOrders = selectedPassOrders.length === PassOrders.length;
//   const theme = useTheme();

//   const statusOptions = [
//     { id: "all", name: "All" },
//     { id: "approved", name: "Approved" },
//     { id: "pending", name: "Pending" },
//     { id: "rejected", name: "Rejected" },
//     { id: "active", name: "Active" },
//     { id: "inactive", name: "In-Active" },
//   ];

//   const handleStatusChange = (event: SelectChangeEvent<string>): void => {
//     const value =
//       event.target.value !== "all"
//         ? (event.target.value as PassOrderStatus)
//         : null;

//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       status: value,
//     }));
//   };

//   const handlePaymentStatusChange = (
//     event: SelectChangeEvent<"paid" | "not paid">
//   ): void => {
//     const value =
//       event.target.value !== "all"
//         ? (event.target.value as "paid" | "not paid")
//         : null;

//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       paymentStatus: value,
//     }));
//   };

//   return (
//     <Card>
//       <CardHeader
//         action={
//           <Box display="flex" gap={2}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Request Type</InputLabel>
//               <Select
//                 value={filters.requestType || "all"}
//                 onChange={handleRequestTypeChange}
//                 label="Request Type"
//                 autoWidth
//                 sx={{ width: "200px" }}
//               >
//                 <MenuItem value="New Bus Pass Request">New Bus Pass Request</MenuItem>
//                 <MenuItem value="Bus Pass Generation">Bus Pass Generation</MenuItem>
//                 <MenuItem value="Update the Route">Update the Route</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//         }
//         title="Pass Requests"
//       />
//       <Divider />
//       <Box display="flex" flexDirection="row" alignItems="center" padding={2}>
//         <Box display="flex" gap={2} alignItems="center" marginRight={2}>
//           <FormControl variant="outlined" size="small">
//             <InputLabel>Status</InputLabel>
//             <Select
//               value={filters.status || "all"}
//               onChange={handleStatusChange}
//               label="Status"
//             >
//               {statusOptions.map((option) => (
//                 <MenuItem key={option.id} value={option.id}>
//                   {option.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl variant="outlined" size="small">
//             <InputLabel>Payment Status</InputLabel>
//             <Select
//               value={filters.paymentStatus || "all"}
//               onChange={handlePaymentStatusChange}
//               label="Payment Status"
//             >
//               <MenuItem value="all">All</MenuItem>
//               <MenuItem value="paid">Paid</MenuItem>
//               <MenuItem value="not paid">Not Paid</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//         <Box flexGrow={1} />
//       </Box>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Student Name</TableCell>
//               <TableCell>Stop Name</TableCell>
//               <TableCell>Route Name</TableCell>
//               <TableCell>Pass Status</TableCell>
//               <TableCell>Payment Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedPassOrders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.student?.name || "N/A"}</TableCell>
//                 <TableCell>{order.assignedStop || order.requestStopName}</TableCell>
//                 <TableCell>{order.routeName || "N/A"}</TableCell>
//                 <TableCell>{getStatusLabel(order.status)}</TableCell>
//                 <TableCell>
//                   <Select
//                     value={order.feeStatus ? "paid" : "not paid"}
//                     onChange={(e) => handlePaymentStatusChangeForOrder(e, order.id)}
//                     size="small"
//                   >
//                     <MenuItem value="paid">Paid</MenuItem>
//                     <MenuItem value="not paid">Not Paid</MenuItem>
//                   </Select>
//                 </TableCell>
//                 <TableCell>
//                   <Tooltip title="Approve">
//                     <IconButton
//                       color="success"
//                       onClick={(e) => handleApprovalClick(e, order)}
//                     >
//                       <CheckIcon />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={filteredPassOrders.length}
//         rowsPerPage={limit}
//         page={page}
//         onPageChange={handlePageChange}
//         onRowsPerPageChange={handleLimitChange}
//       />
//       {dialogOpen && currentOrder && (
//         <ApprovalDialog
//           open={dialogOpen}
//           onClose={handleDialogClose}
//           onSave={handleApprovalUpdate}
//           order={currentOrder}
//         />
//       )}
//     </Card>
//   );
// };

// export default PassRequestsTable;

