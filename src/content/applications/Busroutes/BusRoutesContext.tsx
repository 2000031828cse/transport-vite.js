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

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Route {
  sno: number;
  location: string;
  routeName: string;
  timings: string;
  stops: string[];
}

interface BusRoutesContextProps {
  routes: Route[];
  addRoute: (route: Route) => void;
  updateRoute: (updatedRoute: Route) => void;
  deleteRoute: (sno: number) => void;
  getRoutesForStop: (stop: string) => Route[];
}

const BusRoutesContext = createContext<BusRoutesContextProps | undefined>(
  undefined
);

export const useBusRoutes = () => {
  const context = useContext(BusRoutesContext);
  if (!context) {
    throw new Error('useBusRoutes must be used within a BusRoutesProvider');
  }
  return context;
};

// Define props interface for the provider
interface BusRoutesProviderProps {
  children: ReactNode;
}

const BusRoutesProvider: React.FC<BusRoutesProviderProps> = ({ children }) => {
  const [routes, setRoutes] = useState<Route[]>([
    // Your predefined routes
  ]);

  const addRoute = (route: Route) => {
    setRoutes((prevRoutes) => [
      ...prevRoutes,
      { ...route, sno: prevRoutes.length + 1 }
    ]);
  };

  const updateRoute = (updatedRoute: Route) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) =>
        route.sno === updatedRoute.sno ? updatedRoute : route
      )
    );
  };

  const deleteRoute = (sno: number) => {
    setRoutes((prevRoutes) => {
      const updatedRoutes = prevRoutes.filter((route) => route.sno !== sno);
      return updatedRoutes.map((route, index) => ({
        ...route,
        sno: index + 1
      }));
    });
  };

  const getRoutesForStop = (stop: string): Route[] => {
    return routes.filter((route) => route.stops.includes(stop));
  };

  return (
    <BusRoutesContext.Provider
      value={{ routes, addRoute, updateRoute, deleteRoute, getRoutesForStop }}
    >
      {children}
    </BusRoutesContext.Provider>
  );
};

export default BusRoutesProvider;

