// // // // //code with api
// // // // // import React, {
// // // // //   createContext,
// // // // //   useContext,
// // // // //   useState,
// // // // //   useEffect,
// // // // //   ReactNode,
// // // // // } from "react";

// // // // // interface Vehicle {
// // // // //   id: number;
// // // // //   vehicleNumber: string;
// // // // //   registrationNumber: string;
// // // // //   driverName: string;
// // // // //   driversLicenseNumber: string;
// // // // //   capacity: number;
// // // // // }

// // // // // interface VehiclesContextType {
// // // // //   vehicles: Vehicle[];
// // // // //   addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
// // // // //   deleteVehicle: (id: number) => void;
// // // // // }

// // // // // const VehiclesContext = createContext<VehiclesContextType | undefined>(
// // // // //   undefined
// // // // // );

// // // // // export const useVehicles = () => {
// // // // //   const context = useContext(VehiclesContext);
// // // // //   if (!context) {
// // // // //     throw new Error("useVehicles must be used within a VehiclesProvider");
// // // // //   }
// // // // //   return context;
// // // // // };

// // // // // export const VehiclesProvider: React.FC<{ children: ReactNode }> = ({
// // // // //   children,
// // // // // }) => {
// // // // //   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
// // // // //   const apiUrl = "/v2/api/transport"; // Replace with your actual API URL
// // // // //   const otpt = sessionStorage.getItem("otptoken");

// // // // //   useEffect(() => {
// // // // //     fetch(`${apiUrl}/vehicles`, {
// // // // //       headers: {
// // // // //         Authorization: `Bearer ${otpt}`,
// // // // //       },
// // // // //     })
// // // // //       .then((response) => response.json())
// // // // //       .then((data) => setVehicles(data))
// // // // //       .catch((error) => console.error("Error fetching vehicles:", error));
// // // // //   }, [apiUrl, otpt]);

// // // // //   const addVehicle = (vehicle: Omit<Vehicle, "id">) => {
// // // // //     fetch(`${apiUrl}/vehicles`, {
// // // // //       method: "POST",
// // // // //       headers: {
// // // // //         "Content-Type": "application/json",
// // // // //         Authorization: `Bearer ${otpt}`,
// // // // //       },
// // // // //       body: JSON.stringify(vehicle),
// // // // //     })
// // // // //       .then((response) => response.json())
// // // // //       .then((data) => {
// // // // //         setVehicles((prevVehicles) => [...prevVehicles, data]);
// // // // //       })
// // // // //       .catch((error) => console.error("Error adding vehicle:", error));
// // // // //   };

// // // // //   const deleteVehicle = (id: number) => {
// // // // //     fetch(`${apiUrl}/vehicles/${id}`, {
// // // // //       method: "DELETE",
// // // // //       headers: {
// // // // //         Authorization: `Bearer ${otpt}`,
// // // // //       },
// // // // //     })
// // // // //       .then((response) => {
// // // // //         if (!response.ok) {
// // // // //           throw new Error("Failed to delete vehicle");
// // // // //         }
// // // // //         setVehicles((prevVehicles) =>
// // // // //           prevVehicles.filter((vehicle) => vehicle.id !== id)
// // // // //         );
// // // // //       })
// // // // //       .catch((error) => console.error("Error deleting vehicle:", error));
// // // // //   };

// // // // //   return (
// // // // //     <VehiclesContext.Provider value={{ vehicles, addVehicle, deleteVehicle }}>
// // // // //       {children}
// // // // //     </VehiclesContext.Provider>
// // // // //   );
// // // // // };

// // // // import React, { createContext, useContext, useState, ReactNode } from "react";

// // // // interface Vehicle {
// // // //   id: number;
// // // //   vehicleNumber: string;
// // // //   registrationNumber: string;
// // // //   driverName: string;
// // // //   driversLicenseNumber: string;
// // // //   capacity: number;
// // // // }

// // // // interface VehiclesContextType {
// // // //   vehicles: Vehicle[];
// // // //   addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
// // // //   deleteVehicle: (id: number) => void;
// // // // }

// // // // const VehiclesContext = createContext<VehiclesContextType | undefined>(
// // // //   undefined
// // // // );

// // // // export const useVehicles = () => {
// // // //   const context = useContext(VehiclesContext);
// // // //   if (!context) {
// // // //     throw new Error("useVehicles must be used within a VehiclesProvider");
// // // //   }
// // // //   return context;
// // // // };

// // // // export const VehiclesProvider: React.FC<{ children: ReactNode }> = ({
// // // //   children,
// // // // }) => {
// // // //   const [vehicles, setVehicles] = useState<Vehicle[]>([
// // // //     // Initial mock data
// // // //     {
// // // //       id: 1,
// // // //       vehicleNumber: "V12345",
// // // //       registrationNumber: "RN67890",
// // // //       driverName: "John Doe",
// // // //       driversLicenseNumber: "DL12345",
// // // //       capacity: 50,
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       vehicleNumber: "V67890",
// // // //       registrationNumber: "RN12345",
// // // //       driverName: "Jane Smith",
// // // //       driversLicenseNumber: "DL67890",
// // // //       capacity: 40,
// // // //     },
// // // //   ]);

// // // //   const addVehicle = (vehicle: Omit<Vehicle, "id">) => {
// // // //     const newVehicle = {
// // // //       id: vehicles.length + 1, // Simulate auto-increment id
// // // //       ...vehicle,
// // // //     };
// // // //     setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
// // // //   };

// // // //   const deleteVehicle = (id: number) => {
// // // //     setVehicles((prevVehicles) =>
// // // //       prevVehicles.filter((vehicle) => vehicle.id !== id)
// // // //     );
// // // //   };

// // // //   return (
// // // //     <VehiclesContext.Provider value={{ vehicles, addVehicle, deleteVehicle }}>
// // // //       {children}
// // // //     </VehiclesContext.Provider>
// // // //   );
// // // // };

// // // import React, { createContext, useContext, useState, ReactNode } from "react";

// // // export interface Vehicle {
// // //   id: number;
// // //   vehicleNumber: string;
// // //   registrationNumber: string;
// // //   driverName: string;
// // //   driversLicenseNumber: string;
// // //   capacity: number;
// // // }

// // // interface VehiclesContextType {
// // //   vehicles: Vehicle[];
// // //   addVehicle: (vehicle: Omit<Vehicle, "id" | "logs">) => void;
// // //   deleteVehicle: (id: number) => void;
// // //   updateVehicle: (
// // //     id: number,
// // //     updatedVehicle: Omit<Vehicle, "id" | "logs">
// // //   ) => void;
// // // }

// // // const VehiclesContext = createContext<VehiclesContextType | undefined>(
// // //   undefined
// // // );

// // // export const useVehicles = () => {
// // //   const context = useContext(VehiclesContext);
// // //   if (!context) {
// // //     throw new Error("useVehicles must be used within a VehiclesProvider");
// // //   }
// // //   return context;
// // // };

// // // export const VehiclesProvider: React.FC<{ children: ReactNode }> = ({
// // //   children,
// // // }) => {
// // //   const [vehicles, setVehicles] = useState<Vehicle[]>([
// // //     // Initial mock data
// // //     {
// // //       id: 1,
// // //       vehicleNumber: "V12345",
// // //       registrationNumber: "RN67890",
// // //       driverName: "John Doe",
// // //       driversLicenseNumber: "DL12345",

// // //       capacity: 50,
// // //     },
// // //     {
// // //       id: 2,
// // //       vehicleNumber: "V67890",
// // //       registrationNumber: "RN12345",
// // //       driverName: "Jane Smith",
// // //       driversLicenseNumber: "DL67890",
// // //       capacity: 40,
// // //     },
// // //   ]);

// // //   const addVehicle = (vehicle: Omit<Vehicle, "id" | "logs">) => {
// // //     const newVehicle = {
// // //       id: vehicles.length + 1, // Simulate auto-increment id
// // //       logs: [],
// // //       ...vehicle,
// // //     };
// // //     setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
// // //   };

// // //   const deleteVehicle = (id: number) => {
// // //     setVehicles((prevVehicles) =>
// // //       prevVehicles.filter((vehicle) => vehicle.id !== id)
// // //     );
// // //   };

// // //   const updateVehicle = (
// // //     id: number,
// // //     updatedVehicle: Omit<Vehicle, "id" | "logs">
// // //   ) => {
// // //     setVehicles((prevVehicles) =>
// // //       prevVehicles.map((vehicle) =>
// // //         vehicle.id === id ? { ...vehicle, ...updatedVehicle } : vehicle
// // //       )
// // //     );
// // //   };

// // //   return (
// // //     <VehiclesContext.Provider
// // //       value={{ vehicles, addVehicle, deleteVehicle, updateVehicle }}
// // //     >
// // //       {children}
// // //     </VehiclesContext.Provider>
// // //   );
// // // };

// // import React, {
// //   createContext,
// //   useContext,
// //   useState,
// //   ReactNode,
// //   useEffect,
// // } from "react";

// // export interface Vehicle {
// //   id: number;
// //   busName: string;
// //   vehicleNumber: string;
// //   registrationNumber: string;
// //   driverName: string;
// //   busType: string;
// //   busCapacity: number;
// //   busModel: string;
// // }

// // interface VehiclesContextType {
// //   vehicles: Vehicle[];
// //   addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
// //   deleteVehicle: (id: number) => void;
// //   updateVehicle: (id: number, updatedVehicle: Omit<Vehicle, "id">) => void;
// // }

// // const VehiclesContext = createContext<VehiclesContextType | undefined>(
// //   undefined
// // );

// // export const useVehicles = () => {
// //   const context = useContext(VehiclesContext);
// //   if (!context) {
// //     throw new Error("useVehicles must be used within a VehiclesProvider");
// //   }
// //   return context;
// // };

// // export const VehiclesProvider: React.FC<{ children: ReactNode }> = ({
// //   children,
// // }) => {
// //   const [vehicles, setVehicles] = useState<Vehicle[]>([]);

// //   useEffect(() => {
// //     fetch("/v2/api/transport")
// //       .then((response) => response.json())
// //       .then((data) => setVehicles(data))
// //       .catch((error) => console.error("Error fetching vehicles:", error));
// //   }, []);

// //   const addVehicle = (vehicle: Omit<Vehicle, "id">) => {
// //     fetch("/v2/api/transport", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(vehicle),
// //     })
// //       .then((response) => response.json())
// //       .then((newVehicle) =>
// //         setVehicles((prevVehicles) => [...prevVehicles, newVehicle])
// //       )
// //       .catch((error) => console.error("Error adding vehicle:", error));
// //   };

// //   const deleteVehicle = (id: number) => {
// //     fetch(`/v2/api/transport/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then(() =>
// //         setVehicles((prevVehicles) =>
// //           prevVehicles.filter((vehicle) => vehicle.id !== id)
// //         )
// //       )
// //       .catch((error) => console.error("Error deleting vehicle:", error));
// //   };

// //   const updateVehicle = (id: number, updatedVehicle: Omit<Vehicle, "id">) => {
// //     fetch(`/v2/api/transport/${id}`, {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(updatedVehicle),
// //     })
// //       .then((response) => response.json())
// //       .then((newVehicle) =>
// //         setVehicles((prevVehicles) =>
// //           prevVehicles.map((vehicle) =>
// //             vehicle.id === id ? newVehicle : vehicle
// //           )
// //         )
// //       )
// //       .catch((error) => console.error("Error updating vehicle:", error));
// //   };

// //   return (
// //     <VehiclesContext.Provider
// //       value={{ vehicles, addVehicle, deleteVehicle, updateVehicle }}
// //     >
// //       {children}
// //     </VehiclesContext.Provider>
// //   );
// // };

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// interface Vehicle {
//   id: number;
//   busName: string;
//   vehicleNumber: string;
//   registrationNumber: string;
//   driverName: string;
//   driverLicenseNumber: string;
//   busType: string;
//   busCapacity: number;
//   busModel: string;
// }

// interface VehicleContextType {
//   vehicles: Vehicle[];
//   fetchVehicles: () => void;
//   addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
//   deleteVehicle: (id: number) => void;
// }

// const VehicleContext = createContext<VehicleContextType | undefined>(undefined);
// const otpt = sessionStorage.getItem("otptoken");

// export const useVehicles = (): VehicleContextType => {
//   const context = useContext(VehicleContext);
//   if (!context) {
//     throw new Error("useVehicles must be used within a VehicleProvider");
//   }
//   return context;
// };

// interface VehicleProviderProps {
//   children: ReactNode;
// }

// export const VehicleProvider: React.FC<VehicleProviderProps> = ({
//   children,
// }) => {
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);

//   const fetchVehicles = async () => {
//     try {
//       const response = await fetch("/v2/api/transport/vehicles");
//       const data = await response.json();
//       setVehicles(data);
//     } catch (error) {
//       console.error("Failed to fetch vehicles:", error);
//     }
//   };

//   const addVehicle = async (vehicle: Omit<Vehicle, "id">) => {
//     try {
//       const response = await fetch("/v2/api/transport/vehicles", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${otpt}`,
//         },
//         body: JSON.stringify(vehicle),
//       });
//       const newVehicle = await response.json();
//       setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
//     } catch (error) {
//       console.error("Failed to add vehicle:", error);
//     }
//   };

//   const deleteVehicle = async (id: number) => {
//     try {
//       await fetch(`/v2/api/transport/vehicles/${id}`, {
//         method: "DELETE",
//       });
//       setVehicles((prevVehicles) =>
//         prevVehicles.filter((vehicle) => vehicle.id !== id)
//       );
//     } catch (error) {
//       console.error("Failed to delete vehicle:", error);
//     }
//   };

//   useEffect(() => {
//     fetchVehicles();
//   }, []);

//   return (
//     <VehicleContext.Provider
//       value={{ vehicles, fetchVehicles, addVehicle, deleteVehicle }}
//     >
//       {children}
//     </VehicleContext.Provider>
//   );
// };

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Vehicle {
  id: number;
  busName: string;
  vehicleNumber: string;
  registrationNumber: string;
  driverName: string;
  driverLicenseNumber: string;
  busType: string;
  busCapacity: number;
  busModel: string;
}

interface VehicleContextType {
  vehicles: Vehicle[];
  fetchVehicles: () => void;
  addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
  deleteVehicle: (id: number) => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

const otpt = sessionStorage.getItem("otptoken");

export const useVehicles = (): VehicleContextType => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error("useVehicles must be used within a VehicleProvider");
  }
  return context;
};

interface VehicleProviderProps {
  children: ReactNode;
}

export const VehiclesProvider: React.FC<VehicleProviderProps> = ({
  children,
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("/v2/api/transport/bus");
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    }
  };

  const addVehicle = async (vehicle: Omit<Vehicle, "id">) => {
    try {
      const response = await fetch("/v2/api/transport/bus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otpt}`,
        },
        body: JSON.stringify(vehicle),
      });
      const newVehicle = await response.json();
      setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
    } catch (error) {
      console.error("Failed to add vehicle:", error);
    }
  };

  const deleteVehicle = async (id: number) => {
    try {
      await fetch(`/v2/api/transport/bus/${id}`, {
        method: "DELETE",
      });
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <VehicleContext.Provider
      value={{ vehicles, fetchVehicles, addVehicle, deleteVehicle }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
