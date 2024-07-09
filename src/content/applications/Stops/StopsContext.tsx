// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface Stop {
//   number: number;
//   name: string;
//   latitude: string;
//   longitude: string;
//   address: string;
//   landmark: string;
// }

// interface StopsContextType {
//   stops: Stop[];
//   addStop: (stop: Omit<Stop, 'number'>) => void;
//   deleteStop: (number: number) => void;
// }

// const StopsContext = createContext<StopsContextType | undefined>(undefined);

// export const useStops = () => {
//   const context = useContext(StopsContext);
//   if (!context) {
//     throw new Error('useStops must be used within a StopsProvider');
//   }
//   return context;
// };

// export const StopsProvider: React.FC<{ children: ReactNode }> = ({
//   children
// }) => {
//   const [stops, setStops] = useState<Stop[]>([
//     {
//       number: 1,
//       name: 'benz circle',
//       latitude: '16.5062',
//       longitude: '80.6480',
//       address: 'Benz Circle, Vijayawada',
//       landmark: 'near Benz Circle'
//     },
//     {
//       number: 2,
//       name: 'varadhi',
//       latitude: '16.5088',
//       longitude: '80.6310',
//       address: 'Varadhi, Vijayawada',
//       landmark: 'near Varadhi'
//     },
//     {
//       number: 3,
//       name: 'tadepalli',
//       latitude: '16.4668',
//       longitude: '80.6256',
//       address: 'Tadepalli, Guntur',
//       landmark: 'near Tadepalli'
//     }
//   ]);

//   const addStop = (stop: Omit<Stop, 'number'>) => {
//     const newNumber =
//       stops.length > 0 ? Math.max(...stops.map((s) => s.number)) + 1 : 1;
//     const newStop: Stop = { ...stop, number: newNumber };
//     setStops([...stops, newStop]);
//   };

//   const deleteStop = (number: number) => {
//     setStops(stops.filter((stop) => stop.number !== number));
//   };

//   return (
//     <StopsContext.Provider value={{ stops, addStop, deleteStop }}>
//       {children}
//     </StopsContext.Provider>
//   );
// };

// import React, { createContext, useContext, useState, ReactNode } from "react";

// interface Stop {
//   number: number;
//   name: string;
//   latitude: string;
//   longitude: string;
//   landmark: string;
// }

// interface StopsContextType {
//   stops: Stop[];
//   addStop: (stop: Omit<Stop, "number">) => void;
//   deleteStop: (number: number) => void;
// }

// const StopsContext = createContext<StopsContextType | undefined>(undefined);

// export const useStops = () => {
//   const context = useContext(StopsContext);
//   if (!context) {
//     throw new Error("useStops must be used within a StopsProvider");
//   }
//   return context;
// };

// export const StopsProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [stops, setStops] = useState<Stop[]>([
//     {
//       number: 1,
//       name: "benz circle",
//       latitude: "16.5062",
//       longitude: "80.6480",
//       landmark: "near Benz Circle",
//     },
//     {
//       number: 2,
//       name: "varadhi",
//       latitude: "16.5088",
//       longitude: "80.6310",
//       landmark: "near Varadhi",
//     },
//     {
//       number: 3,
//       name: "tadepalli",
//       latitude: "16.4668",
//       longitude: "80.6256",
//       landmark: "near Tadepalli",
//     },
//   ]);

//   const addStop = (stop: Omit<Stop, "number">) => {
//     const newNumber =
//       stops.length > 0 ? Math.max(...stops.map((s) => s.number)) + 1 : 1;
//     const newStop: Stop = { ...stop, number: newNumber };
//     setStops([...stops, newStop]);
//   };

//   const deleteStop = (number: number) => {
//     const updatedStops = stops.filter((stop) => stop.number !== number);
//     const reassignedStops = updatedStops.map((stop, index) => ({
//       ...stop,
//       number: index + 1,
//     }));
//     setStops(reassignedStops);
//   };

//   return (
//     <StopsContext.Provider value={{ stops, addStop, deleteStop }}>
//       {children}
//     </StopsContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Stop {
  id: number;
  address: string;
  lat: number;
  lng: number;
  landmark: string;
}

interface StopsContextType {
  stops: Stop[];
  addStop: (stop: Omit<Stop, "id">) => void;
  deleteStop: (id: number) => void;
}

const StopsContext = createContext<StopsContextType | undefined>(undefined);

export const useStops = () => {
  const context = useContext(StopsContext);
  if (!context) {
    throw new Error("useStops must be used within a StopsProvider");
  }
  return context;
};

export const StopsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stops, setStops] = useState<Stop[]>([]);
  const apiUrl = '/v2/api/transport'; // Replace with your actual API URL
  const otpt = sessionStorage.getItem('otptoken');
  useEffect(() => {
    fetch(`${apiUrl}/stops`)
      .then(response => response.json())
      .then(data => setStops(data))
      .catch(error => console.error('Error fetching stops:', error));
  }, [apiUrl]);

  const addStop = (stop: Omit<Stop, "id">) => {
    fetch(`${apiUrl}/stops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
         'Authorization': `Bearer ${otpt}`
       },
      body: JSON.stringify(stop),
    })
      .then(response => response.json())
      .then(data => {
        setStops(prevStops => [...prevStops, data]);
      })
      .catch(error => console.error('Error adding stop:', error));
  };

  const deleteStop = (id: number) => {
    fetch(`${apiUrl}/stops/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setStops(prevStops => prevStops.filter(stop => stop.id !== id));
      })
      .catch(error => console.error('Error deleting stop:', error));
  };

  return (
    <StopsContext.Provider value={{ stops, addStop, deleteStop }}>
      {children}
    </StopsContext.Provider>
  );
};
