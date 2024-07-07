import React from 'react';
import { Card } from '@mui/material';
import PassRequestsTable from './PassRequestsTable';
import { PassOrder } from 'src/models/pass_request'; // Adjusted import to include CryptoOrder

function PassRequests() {
  const PassOrders: PassOrder[] = [
    {
      id: '1',
      Studentid: '1',
      status: 'pending',
      orderID: 'VUVX709ET7BY',
      studentName: 'Peter',
      Stop: 'ntr circle',
      paymentStatus: 'not paid',
      actions: 'approval' // Added approvalStatus
    },
    {
      id: '2',
      Studentid: '2',
      status: 'pending',
      orderID: '23M3UOG65G8K',
      studentName: 'Chris',
      Stop: 'patamata',
      paymentStatus: 'not paid',
      actions: 'approval' // Added approvalStatus
    },
    {
      id: '3',
      Studentid: '3',
      status: 'pending',
      orderID: '4HJDV8HV34LM',
      studentName: 'John',
      Stop: 'benz circle',
      paymentStatus: 'not paid',
      actions: 'approval' // Added approvalStatus
    }
  ];

  return (
    <Card>
      <PassRequestsTable PassOrders={PassOrders} />
    </Card>
  );
}

export default PassRequests;
