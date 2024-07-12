export type PassOrderStatus = 'pending' | 'approved' | 'rejected' | 'active' | 'inactive' ;

export interface PassOrder {
  routeId: number;
  routeName: string | null; // routeName can be null if not provided
  id: number;
  userId: number; // Assuming userId is a number
  student: {
    name: string;
  };
  assignedStop: string;
  feeStatus: boolean;
  status: PassOrderStatus;
  buspassId: string; // Ensure buspassId is always a string
}
