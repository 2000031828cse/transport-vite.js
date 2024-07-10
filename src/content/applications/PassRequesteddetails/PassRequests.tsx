import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import PassRequestsTable from './PassRequestsTable';
import { PassOrder } from 'src/models/pass_request';

function PassRequests() {
  const [passOrders, setPassOrders] = useState<PassOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const otpt = sessionStorage.getItem('otptoken');
  useEffect(() => {
    const fetchPassOrders = async () => {
      try {
        const response = await fetch('/v2/api/transport/buspasses', {
          headers: {
            'Authorization': `Bearer ${otpt}`, // Add the token here if needed
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: PassOrder[] = await response.json();
        setPassOrders(data);
      } catch (err) {
        setError('Failed to fetch pass orders');
      } finally {
        setLoading(false);
      }
    };
    

    fetchPassOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Card>
      <PassRequestsTable PassOrders={passOrders} />
    </Card>
  );
}

export default PassRequests;
