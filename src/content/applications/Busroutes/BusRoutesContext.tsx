// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// interface Stop {
//   id: number;
//   address: string;
// }

// interface Driver {
//   id: number;
//   driverName: string;
// }

// interface Bus {
//   id: number;
//   busName: string;
//   driver: Driver;
// }

// interface Route {
//   id: number;
//   name: string;
//   timings: string;
//   stops: Stop[];
//   buses: Bus[];
// }

// interface BusRoutesContextProps {
//   routes: Route[];
//   fetchRoutes: () => Promise<void>;
//   addRoute: (route: Route) => void;
//   deleteRoute: (id: number) => void;
//   updateRoute: (route: Route) => void;
// }

// const BusRoutesContext = createContext<BusRoutesContextProps | undefined>(
//   undefined
// );

// export const useBusRoutes = () => {
//   const context = useContext(BusRoutesContext);
//   if (!context) {
//     throw new Error("useBusRoutes must be used within a BusRoutesProvider");
//   }
//   return context;
// };

// export const BusRoutesProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [routes, setRoutes] = useState<Route[]>([]);

//   const apiUrl = "/v2/api/transport"; // Update with your actual API URL

//   const fetchRoutes = async () => {
//     const otpt = sessionStorage.getItem("otptoken");
//     try {
//       const response = await fetch(`${apiUrl}/routes`, {
//         headers: {
//           Authorization: `Bearer ${otpt}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch routes");
//       }
//       const data = await response.json();
//       setRoutes(data);
//     } catch (error) {
//       console.error("Error fetching routes:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRoutes();
//   }, []);

//   const addRoute = async (route: Route) => {
//     const otpt = sessionStorage.getItem("otptoken");
//     const routePayload = {
//       name: route.name,
//       timings: route.timings,
//       stopIds: route.stops.map((stop) => stop.id),
//       busIds: route.buses.map((b) => b.id),
//     };

//     try {
//       const response = await fetch(`${apiUrl}/routes`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${otpt}`,
//         },
//         body: JSON.stringify(routePayload),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to add route");
//       }
//       const data = await response.json();
//       setRoutes((prevRoutes) => [...prevRoutes, data]);
//     } catch (error) {
//       console.error("Error adding route:", error);
//     }
//   };

//   const deleteRoute = async (id: number) => {
//     const otpt = sessionStorage.getItem("otptoken");
//     try {
//       const response = await fetch(`${apiUrl}/routes/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${otpt}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Failed to delete route");
//       }
//       setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
//     } catch (error) {
//       console.error("Error deleting route:", error);
//     }
//   };

//   const updateRoute = async (updatedRoute: Route) => {
//     const otpt = sessionStorage.getItem("otptoken");
//     const routePayload = {
//       name: updatedRoute.name,
//       timings: updatedRoute.timings,
//       stopIds: updatedRoute.stops.map((stop) => stop.id),
//       busIds: updatedRoute.buses.map((b) => b.id),
//     };

//     try {
//       const response = await fetch(`${apiUrl}/routes/${updatedRoute.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${otpt}`,
//         },
//         body: JSON.stringify(routePayload),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update route");
//       }
//       await response.json();
//       setRoutes((prevRoutes) =>
//         prevRoutes.map((route) =>
//           route.id === updatedRoute.id ? updatedRoute : route
//         )
//       );
//     } catch (error) {
//       console.error("Error updating route:", error);
//     }
//   };

//   return (
//     <BusRoutesContext.Provider
//       value={{ routes, fetchRoutes, addRoute, deleteRoute, updateRoute }}
//     >
//       {children}
//     </BusRoutesContext.Provider>
//   );
// };

// export default BusRoutesProvider;

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Stop {
  id: number;
  address: string;
  lat: number;
  lng: number;
  landmark: string;
  pickUp: string;
  dropTime: string;
}

interface Driver {
  id: number;
  driverName: string;
}

interface Bus {
  id: number;
  busName: string;
  driver: Driver;
}

interface Route {
  id: number;
  name: string;
  // timings: string;
  stops: Stop[];
  buses: Bus[];
}

interface BusRoutesContextProps {
  routes: Route[];
  fetchRoutes: () => Promise<void>;
  addRoute: (route: Route) => void;
  deleteRoute: (id: number) => void;
  updateRoute: (route: Route) => void;
}

const BusRoutesContext = createContext<BusRoutesContextProps | undefined>(
  undefined
);

export const useBusRoutes = () => {
  const context = useContext(BusRoutesContext);
  if (!context) {
    throw new Error("useBusRoutes must be used within a BusRoutesProvider");
  }
  return context;
};

export const BusRoutesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [routes, setRoutes] = useState<Route[]>([]);

  const apiUrl = "/v2/api/transport"; // Update with your actual API URL

  const fetchRoutes = async () => {
    const otpt = sessionStorage.getItem("otptoken");
    try {
      const response = await fetch(`${apiUrl}/routes`, {
        headers: {
          Authorization: `Bearer ${otpt}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch routes");
      }
      const data = await response.json();
      setRoutes(data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const addRoute = async (route: Route) => {
    const otpt = sessionStorage.getItem("otptoken");
    const routePayload = {
      name: route.name,
      // timings: route.timings,
      stopIds: route.stops.map((stop) => stop.id),
      busIds: route.buses.map((b) => b.id),
    };

    try {
      const response = await fetch(`${apiUrl}/routes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otpt}`,
        },
        body: JSON.stringify(routePayload),
      });
      if (!response.ok) {
        throw new Error("Failed to add route");
      }
      const data = await response.json();
      setRoutes((prevRoutes) => [...prevRoutes, data]);
    } catch (error) {
      console.error("Error adding route:", error);
    }
  };

  const deleteRoute = async (id: number) => {
    const otpt = sessionStorage.getItem("otptoken");
    try {
      const response = await fetch(`${apiUrl}/routes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${otpt}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete route");
      }
      setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
    } catch (error) {
      console.error("Error deleting route:", error);
    }
  };

  const updateRoute = async (updatedRoute: Route) => {
    const otpt = sessionStorage.getItem("otptoken");
    const routePayload = {
      name: updatedRoute.name,
      // timings: updatedRoute.timings,
      stopIds: updatedRoute.stops.map((stop) => stop.id),
      busIds: updatedRoute.buses.map((b) => b.id),
    };

    try {
      const response = await fetch(`${apiUrl}/routes/${updatedRoute.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otpt}`,
        },
        body: JSON.stringify(routePayload),
      });
      if (!response.ok) {
        throw new Error("Failed to update route");
      }
      await response.json();
      setRoutes((prevRoutes) =>
        prevRoutes.map((route) =>
          route.id === updatedRoute.id ? updatedRoute : route
        )
      );
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  return (
    <BusRoutesContext.Provider
      value={{ routes, fetchRoutes, addRoute, deleteRoute, updateRoute }}
    >
      {children}
    </BusRoutesContext.Provider>
  );
};

export default BusRoutesProvider;
