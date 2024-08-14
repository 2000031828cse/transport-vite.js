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
import DownloadIcon from "@mui/icons-material/Download";
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
    color: "info", // Default to a valid color value
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

  const handleDialogOpen = (order: PassOrder | null) => {
    // if (order) {
    setCurrentOrder(order);
    setDialogOpen(true);
    // }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentOrder(null);
  };


  const handleDownloadClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
    order: PassOrder
  ) => {
    event.preventDefault();
    try {
      // Log the order details to check if they're correct
      console.log("Generating bus pass for order:", order);

      // Request to generate the bus pass and fetch the download link
      const response = await fetch(
        "/v2/api/transport/buspasses/generate-bus-pass",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${otpt}`,
          },
          body: JSON.stringify({
            userId: order.userId,
            termId: order.termId,
          }),
        }
      );

      // Check if the response is ok
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Failed to generate bus pass:", errorMessage);
        throw new Error("Failed to generate bus pass");
      }

      // Parse the response JSON
      const data = await response.json();
      console.log("Response data:", data);

      // Ensure downloadLink is available
      const { downloadLink } = data;
      if (!downloadLink) {
        console.error("Invalid response data:", data);
        throw new Error("Response does not contain the download link.");
      }

      // Construct the download URL
      const downloadUrl = `/v2/api/transport/buspasses${downloadLink}`;
      console.log("Download URL:", downloadUrl);

      // Fetch the file to download
      const downloadResponse = await fetch(downloadUrl, {
        headers: {
          Authorization: `Bearer ${otpt}`,
        },
      });

      // Check if the download response is ok
      if (!downloadResponse.ok) {
        const errorMessage = await downloadResponse.text();
        console.error("Failed to download the bus pass:", errorMessage);
        throw new Error("Failed to download the bus pass");
      }

      // Create a blob from the response
      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        downloadLink.split("/").pop() || "bus_pass.pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      console.log("Bus pass downloaded successfully.");
    } catch (error) {
      console.error("Error generating or downloading bus pass:", error);
      alert(
        "There was an error generating or downloading the bus pass. Please try again."
      );
    }
  };


  const handleApprovalClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    order: PassOrder
  ) => {
    event.preventDefault();
    setCurrentOrder(order);
    setDialogOpen(true);
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

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
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
                <MenuItem value="Buspass Generation">
                  Bus Pass Generation
                </MenuItem>
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
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {order.student.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {order.requestStopName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {order.routeName}
                  </Typography>
                </TableCell>
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
                  {order.requestType === "Buspass Generation" ? (
                    <Tooltip title="Download Bus Pass" arrow>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={(event) => handleDownloadClick(event, order)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  ) : order.requestType === "New Bus Pass Request" ||
                    order.requestType === "Update the route" ? (
                    <Tooltip title="Approve Order" arrow>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={(event) => handleApprovalClick(event, order)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  ) : null}
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
      <ApprovalDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        order={currentOrder}
        setOrders={setOrders}
      />
    </Card>
  );
};

export default PassRequestsTable;
