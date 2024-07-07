export type PassOrderStatus = 'completed' | 'pending' | 'rejected' | 'active';

export interface PassOrder {
  paymentStatus: 'paid' | 'not paid';
  id: string;
  Studentid: string;
  Stop: string;
  status: PassOrderStatus;
  orderID: string;
  studentName: string;
  actions: 'approval';
}
