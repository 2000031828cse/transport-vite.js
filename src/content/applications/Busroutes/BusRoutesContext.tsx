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

interface Stop {
  id: number;
  address: string;
}

interface Route {
  id: number;
  name: string;
  timings: string;
  stops: Stop[];
}

interface BusRoutesContextProps {
  routes: Route[];
  fetchRoutes: () => void;
  addRoute: (route: Route) => void;
  deleteRoute: (id: number) => void;
  updateRoute: (route: Route) => void;
}

const BusRoutesContext = createContext<BusRoutesContextProps | undefined>(undefined);

export const useBusRoutes = () => {
  const context = useContext(BusRoutesContext);
  if (!context) {
    throw new Error('useBusRoutes must be used within a BusRoutesProvider');
  }
  return context;
};

export const BusRoutesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [routes, setRoutes] = useState<Route[]>([]);

  const apiUrl = '/v2/api/transport'; // Update with your actual API URL

  const fetchRoutes = () => {
    const otpt = sessionStorage.getItem('otptoken');
    fetch(`${apiUrl}/routes`, {
      headers: {
        'Authorization': `Bearer ${otpt}`,
      }
    })
      
      .then(response => response.json())
      
      .then(data => setRoutes(data))
      
      .catch(error => console.error('Error fetching routes:', error));
      
  };

  useEffect(() => {
    fetchRoutes(); // Fetch routes on component mount
  }, []);

  const addRoute = (route: Route) => {
    const otpt = sessionStorage.getItem('otptoken');
    const routePayload = {
      name: route.name,
      timings: route.timings,
      stopIds: route.stops.map(stop => stop.id),
    };

    fetch(`${apiUrl}/routes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${otpt}`,
      },
      body: JSON.stringify(routePayload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add route');
        }
        return response.json();
      })
      .then(data => {
        setRoutes(prevRoutes => [...prevRoutes, data]);
      })
      .catch(error => console.error('Error adding route:', error));
  };

  const deleteRoute = (id: number) => {
    const otpt = sessionStorage.getItem('otptoken');
    fetch(`${apiUrl}/routes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${otpt}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete route');
        }
        setRoutes(prevRoutes => prevRoutes.filter(route => route.id !== id));
      })
      .catch(error => console.error('Error deleting route:', error));
  };

  const updateRoute = (updatedRoute: Route) => {
    const otpt = sessionStorage.getItem('otptoken');
    const routePayload = {
      name: updatedRoute.name,
      timings: updatedRoute.timings,
      stopIds: updatedRoute.stops.map(stop => stop.id),
    };

    fetch(`${apiUrl}/routes/${updatedRoute.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${otpt}`,
      },
      body: JSON.stringify(routePayload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update route');
        }
        return response.json();
      })
      .then(() => {
        setRoutes(prevRoutes =>
          prevRoutes.map(route => (route.id === updatedRoute.id ? updatedRoute : route))
        );
      })
      .catch(error => console.error('Error updating route:', error));
  };

  return (
    <BusRoutesContext.Provider value={{ routes, fetchRoutes, addRoute, deleteRoute, updateRoute }}>
      {children}
    </BusRoutesContext.Provider>
  );
};

export default BusRoutesProvider;

