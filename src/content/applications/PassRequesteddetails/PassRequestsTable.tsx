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
  useTheme,
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
    active:{
      text:"active",
      color:"success"
    },
    inactive:{
      text:"in-active",
      color:"error"
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
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
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
    
    try {
      // Fetch the current order details
      const orderResponse = await fetch(`/v2/api/transport/buspasses/${orderId}`, {
        headers: {
          Authorization: `Bearer ${otpt}`,
        },
      });
      if (!orderResponse.ok) {
        throw new Error("Failed to fetch order details");
      }
      
      const order: PassOrder = await orderResponse.json();
  
      // Update the payment status
      const response = await fetch(`/v2/api/transport/buspasses/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otpt}`,
        },
        body: JSON.stringify({ feeStatus: newStatus === "paid" }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const updatedOrder: PassOrder = await response.json();
  
      // If the order is paid and was previously approved, update the status to active
      if (newStatus === "paid" && order.status === "approved") {
        const statusUpdateResponse = await fetch(`/v2/api/transport/buspasses/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${otpt}`,
          },
          body: JSON.stringify({ status: "active" }),
        });
  
        if (!statusUpdateResponse.ok) {
          throw new Error("Failed to update order status");
        }
  
        const finalOrder: PassOrder = await statusUpdateResponse.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === finalOrder.id
              ? {
                  ...order,
                  feeStatus: finalOrder.feeStatus,
                  status: finalOrder.status,
                  student: finalOrder.student,
                }
              : order
          )
        );
      } else {
        // If no status update is required, simply update the orders
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.id
              ? {
                  ...order,
                  feeStatus: updatedOrder.feeStatus,
                  student: updatedOrder.student,
                }
              : order
          )
        );
      }
    } catch (err) {
      console.error("Failed to update payment status:", err);
    }
  };
  const handleApprovalUpdate = async (
    status: PassOrderStatus,
    routeName: string | null,
    assignedStop: string | null,
    busPassId: string // Change this from `orderId: number` to `busPassId: string`
  ) => {
    if (currentOrder) {
      // Check if status is approved and validate required fields
      if (status === 'approved' && (!routeName || !assignedStop||!busPassId
      )) {
        console.error("Approval failed: routeName and assignedStop are required.");
        // Optionally, show an error message to the user
        return;
      }
  
      try {
        const response = await fetch(
          `/v2/api/transport/buspasses/${currentOrder.id}`, // Use `busPassId` here
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${otpt}`,
            },
            body: JSON.stringify({
              status,
              routeName: status === 'approved' ? routeName : undefined,
              assignedStop: status === 'approved' ? assignedStop : undefined,
              buspassId:status ==='approved'? busPassId : undefined,
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
                  student: updatedOrder.student || order.student,
                  buspassId:updatedOrder.buspassId
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
  
  const filteredPassOrders = applyFilters(orders, filters);
  const paginatedPassOrders = applyPagination(filteredPassOrders, page, limit);
  const selectedSomePassOrders =
    selectedPassOrders.length > 0 &&
    selectedPassOrders.length < PassOrders.length;
  const selectedAllPassOrders = selectedPassOrders.length === PassOrders.length;
  const theme = useTheme();

  const statusOptions = [
    { id: "all", name: "All" },
    { id: "approved", name: "Approved" },
    { id: "pending", name: "Pending" },
    { id: "rejected", name: "Rejected" },
    { id: "active", name: "Active" },
    { id: "inactive", name: "In-Active" },
  ];

  const handleStatusChange = (event: SelectChangeEvent<string>): void => {
    const value =
      event.target.value !== "all"
        ? (event.target.value as PassOrderStatus)
        : null;

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handlePaymentStatusChange = (
    event: SelectChangeEvent<"paid" | "not paid">
  ): void => {
    const value =
      event.target.value !== "all"
        ? (event.target.value as "paid" | "not paid")
        : null;

    setFilters((prevFilters) => ({
      ...prevFilters,
      paymentStatus: value,
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
                value={filters.status || "all"}
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
            <FormControl fullWidth variant="outlined">
              <InputLabel>Payment Status</InputLabel>
              <Select
                value={filters.paymentStatus || "all"}
                onChange={handlePaymentStatusChange}
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
        title={
          <Typography variant="h5" align="center">
            Bus Pass Requests
          </Typography>
        }
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STUDENT ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>STOP REQUEST</TableCell>
              <TableCell>PAYMENT STATUS</TableCell>
              <TableCell>ACTIONS</TableCell>
              <TableCell>APPROVAL STATUS</TableCell>
              { /*<TableCell>UPDATE</TableCell>*/}
              <TableCell>ROUTE NAME</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPassOrders.map((order) => {
              const isPassOrderSelected = selectedPassOrders.includes(order.id);
              return (
                <TableRow hover key={order.id} selected={isPassOrderSelected}>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" noWrap>
                      {order.userId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                  <Typography variant="body1" fontWeight="bold" noWrap>
                {order.student?.name || "No Name"}
              </Typography>
                  </TableCell>
                  <TableCell>{order.assignedStop}</TableCell>
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
                  <TableCell>
                    <a
                      href="#"
                      onClick={(event) => handleApprovalClick(event, order)}
                    >
                      Approval
                    </a>
                  </TableCell>
                  <TableCell>{getStatusLabel(order.status)}</TableCell>
                 {/* <TableCell>
                     <Tooltip title="Update" arrow>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleApprovalUpdate("approved", order.routeName, order.assignedStop,order.buspassId)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip> 
                  </TableCell>*/}
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" noWrap>
                      {order.routeName}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
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