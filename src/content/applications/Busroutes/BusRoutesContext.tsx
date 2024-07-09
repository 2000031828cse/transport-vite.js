// // import React, { createContext, useContext, useState } from 'react';

// // interface Route {
// //   sno: number;
// //   shift: string;
// //   location: string;
// //   routeName: string;
// //   timings: string;
// //   // route: string;
// //   startingPoint: string;
// //   stops: string[];
// // }

// // interface BusRoutesContextProps {
// //   routes: Route[];
// //   addRoute: (route: Route) => void;
// //   updateRoute: (updatedRoute: Route) => void;
// //   deleteRoute: (sno: number) => void;
// //   getRoutesForStop: (stop: string) => Route[];
// // }

// // const BusRoutesContext = createContext<BusRoutesContextProps | undefined>(
// //   undefined
// // );

// // export const useBusRoutes = () => {
// //   const context = useContext(BusRoutesContext);
// //   if (!context) {
// //     throw new Error('useBusRoutes must be used within a BusRoutesProvider');
// //   }
// //   return context;
// // };

// // const BusRoutesProvider: React.FC = ({ children }) => {
// //   const [routes, setRoutes] = useState<Route[]>([
// //     // Your predefined stages
// //   ]);

// //   const addRoute = (route: Route) => {
// //     setRoutes((prevRoutes) => [...prevRoutes, route]);
// //   };

// //   const updateRoute = (updatedRoute: Route) => {
// //     setRoutes((prevRoutes) =>
// //       prevRoutes.map((route) =>
// //         route.sno === updatedRoute.sno ? updatedRoute : route
// //       )
// //     );
// //   };

// //   const deleteRoute = (sno: number) => {
// //     setRoutes((prevRoutes) => prevRoutes.filter((route) => route.sno !== sno));
// //   };

// //   const getRoutesForStop = (stop: string): Route[] => {
// //     return routes.filter((route) => route.stops.includes(stop));
// //   };

// //   return (
// //     <BusRoutesContext.Provider
// //       value={{ routes, addRoute, updateRoute, deleteRoute, getRoutesForStop }}
// //     >
// //       {children}
// //     </BusRoutesContext.Provider>
// //   );
// // };

// // export default BusRoutesProvider;
// import React, { createContext, useContext, useState } from 'react';

// interface Route {
//   sno: number;
//   location: string;
//   routeName: string;
//   timings: string;
//   stops: string[];
// }

// interface BusRoutesContextProps {
//   routes: Route[];
//   addRoute: (route: Route) => void;
//   updateRoute: (updatedRoute: Route) => void;
//   deleteRoute: (sno: number) => void;
//   getRoutesForStop: (stop: string) => Route[];
// }

// const BusRoutesContext = createContext<BusRoutesContextProps | undefined>(
//   undefined
// );

// export const useBusRoutes = () => {
//   const context = useContext(BusRoutesContext);
//   if (!context) {
//     throw new Error('useBusRoutes must be used within a BusRoutesProvider');
//   }
//   return context;
// };

// const BusRoutesProvider: React.FC = ({ children }) => {
//   const [routes, setRoutes] = useState<Route[]>([
//     // Your predefined stages
//   ]);

//   const addRoute = (route: Route) => {
//     setRoutes((prevRoutes) => [...prevRoutes, route]);
//   };

//   const updateRoute = (updatedRoute: Route) => {
//     setRoutes((prevRoutes) =>
//       prevRoutes.map((route) =>
//         route.sno === updatedRoute.sno ? updatedRoute : route
//       )
//     );
//   };

//   const deleteRoute = (sno: number) => {
//     setRoutes((prevRoutes) => prevRoutes.filter((route) => route.sno !== sno));
//   };

//   const getRoutesForStop = (stop: string): Route[] => {
//     return routes.filter((route) => route.stops.includes(stop));
//   };

//   return (
//     <BusRoutesContext.Provider
//       value={{ routes, addRoute, updateRoute, deleteRoute, getRoutesForStop }}
//     >
//       {children}
//     </BusRoutesContext.Provider>
//   );
// };

// export default BusRoutesProvider;

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Stop } from './stops'; // Ensure this path is correct

interface Route {
  id: number;
  location: string;
  name: string;
  timings: string;
  stops: Stop[]; // Ensure this is an array of Stop objects
}

interface BusRoutesContextProps {
  routes: Route[];
  addRoute: (route: Route) => void;
  updateRoute: (updatedRoute: Route) => void;
  deleteRoute: (id: number) => void;
  getRoutesForStop: (stop: Stop) => Route[];
}

const BusRoutesContext = createContext<BusRoutesContextProps | undefined>(undefined);

export const useBusRoutes = () => {
  const context = useContext(BusRoutesContext);
  if (!context) {
    throw new Error('useBusRoutes must be used within a BusRoutesProvider');
  }
  return context;
};

interface BusRoutesProviderProps {
  children: ReactNode;
}

const BusRoutesProvider: React.FC<BusRoutesProviderProps> = ({ children }) => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const apiUrl = '/v2/api/transport'; // Replace with your actual API URL

  useEffect(() => {
    fetch(`${apiUrl}/routes`)
      .then(response => response.json())
      .then(data => setRoutes(data))
      .catch(error => console.error('Error fetching routes:', error));
  }, [apiUrl]);

  const addRoute = (route: Route) => {
    fetch(`${apiUrl}/routes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(route),
    })
      .then(response => response.json())
      .then(data => {
        setRoutes(prevRoutes => [...prevRoutes, data]);
      })
      .catch(error => console.error('Error adding route:', error));
  };

  const updateRoute = (updatedRoute: Route) => {
    fetch(`${apiUrl}/routes/${updatedRoute.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRoute),
    })
      .then(response => response.json())
      .then(() => {
        setRoutes(prevRoutes =>
          prevRoutes.map(route => (route.id === updatedRoute.id ? updatedRoute : route))
        );
      })
      .catch(error => console.error('Error updating route:', error));
  };

  const deleteRoute = (id: number) => {
    fetch(`${apiUrl}/routes/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setRoutes(prevRoutes => prevRoutes.filter(route => route.id !== id));
      })
      .catch(error => console.error('Error deleting route:', error));
  };

  const getRoutesForStop = (stop: Stop): Route[] => {
    return routes.filter(route => route.stops.some(s => s.id === stop.id));
  };

  return (
    <BusRoutesContext.Provider value={{ routes, addRoute, updateRoute, deleteRoute, getRoutesForStop }}>
      {children}
    </BusRoutesContext.Provider>
  );
};

export default BusRoutesProvider;
