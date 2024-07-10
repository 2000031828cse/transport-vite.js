export type PassOrderStatus = 'completed' | 'pending' | 'rejected' | 'active';

export interface PassOrder {
  student: any;
  paymentStatus: 'paid' | 'not paid';
  id: string;
  Studentid: string;
  Stop: string;
  status: PassOrderStatus;
  orderID: string;
  actions: 'approval';
  userId: number; // assuming userId is a number
  termId: number;
  stopId: number;
  buspassId: string | null;
  requestStopName: string;
  assignedStop: string;
  renewalStatus: boolean;
  feeStatus: boolean;
  routeId: string | null;
  routeName: string | null;
  updatedAt: string;
  createdAt: string;
}
