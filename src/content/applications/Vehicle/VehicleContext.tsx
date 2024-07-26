// // import React, {
// //   createContext,
// //   useContext,
// //   useState,
// //   useEffect,
// //   ReactNode,
// // } from "react";

// // interface Vehicle {
// //   id: number;
// //   busName: string;
// //   vehicleNumber: string;
// //   registrationNumber: string;
// //   driverName: string;
// //   driverLicenseNumber: string;
// //   busType: string;
// //   busCapacity: number;
// //   busModel: string;
// // }

// // interface VehicleContextType {
// //   vehicles: Vehicle[];
// //   fetchVehicles: () => void;
// //   addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
// //   deleteVehicle: (id: number) => void;
// // }

// // const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

// // const otpt = sessionStorage.getItem("otptoken");

// // export const useVehicles = (): VehicleContextType => {
// //   const context = useContext(VehicleContext);
// //   if (!context) {
// //     throw new Error("useVehicles must be used within a VehicleProvider");
// //   }
// //   return context;
// // };

// // interface VehicleProviderProps {
// //   children: ReactNode;
// // }

// // export const VehiclesProvider: React.FC<VehicleProviderProps> = ({
// //   children,
// // }) => {
// //   const [vehicles, setVehicles] = useState<Vehicle[]>([]);

// //   const fetchVehicles = async () => {
// //     try {
// //       const response = await fetch("/v2/api/transport/bus");
// //       const data = await response.json();

// //       const mappedData = data.map((vehicle: any) => ({
// //         ...vehicle,
// //         driverName: vehicle.driver.driverName,
// //         driverLicenseNumber: vehicle.driver.driverLicenseNo, // Add the correct field if available
// //       }));

// //       setVehicles(mappedData);
// //     } catch (error) {
// //       console.error("Failed to fetch vehicles:", error);
// //     }
// //   };

// //   const addVehicle = async (vehicle: Omit<Vehicle, "id">) => {
// //     try {
// //       const response = await fetch("/v2/api/transport/bus", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${otpt}`,
// //         },
// //         body: JSON.stringify(vehicle),
// //       });
// //       const newVehicle = await response.json();

// //       // Ensure that the driver information is correctly included
// //       const updatedVehicle = {
// //         ...newVehicle,
// //         driverName: newVehicle.driver?.driverName || vehicle.driverName,
// //         driverLicenseNumber:
// //           newVehicle.driver?.driverLicenseNo || vehicle.driverLicenseNumber,
// //       };

// //       setVehicles((prevVehicles) => [...prevVehicles, updatedVehicle]);
// //     } catch (error) {
// //       console.error("Failed to add vehicle:", error);
// //     }
// //   };

// //   const deleteVehicle = async (id: number) => {
// //     try {
// //       await fetch(`/v2/api/transport/bus/${id}`, {
// //         method: "DELETE",
// //       });
// //       setVehicles((prevVehicles) =>
// //         prevVehicles.filter((vehicle) => vehicle.id !== id)
// //       );
// //     } catch (error) {
// //       console.error("Failed to delete vehicle:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchVehicles();
// //   }, []);

// //   return (
// //     <VehicleContext.Provider
// //       value={{ vehicles, fetchVehicles, addVehicle, deleteVehicle }}
// //     >
// //       {children}
// //     </VehicleContext.Provider>
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
//   editVehicle: (id: number, updatedVehicle: Omit<Vehicle, "id">) => void;
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

// export const VehiclesProvider: React.FC<VehicleProviderProps> = ({
//   children,
// }) => {
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);

//   const fetchVehicles = async () => {
//     try {
//       const response = await fetch("/v2/api/transport/bus");
//       const data = await response.json();

//       const mappedData = data.map((vehicle: any) => ({
//         ...vehicle,
//         driverName: vehicle.driver.driverName,
//         driverLicenseNumber: vehicle.driver.driverLicenseNo, // Add the correct field if available
//       }));

//       setVehicles(mappedData);
//     } catch (error) {
//       console.error("Failed to fetch vehicles:", error);
//     }
//   };

//   const addVehicle = async (vehicle: Omit<Vehicle, "id">) => {
//     try {
//       const response = await fetch("/v2/api/transport/bus", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${otpt}`,
//         },
//         body: JSON.stringify(vehicle),
//       });
//       const newVehicle = await response.json();

//       // Ensure that the driver information is correctly included
//       const updatedVehicle = {
//         ...newVehicle,
//         driverName: newVehicle.driver?.driverName || vehicle.driverName,
//         driverLicenseNumber:
//           newVehicle.driver?.driverLicenseNo || vehicle.driverLicenseNumber,
//       };

//       setVehicles((prevVehicles) => [...prevVehicles, updatedVehicle]);
//     } catch (error) {
//       console.error("Failed to add vehicle:", error);
//     }
//   };

//   const editVehicle = async (
//     id: number,
//     updatedVehicle: Omit<Vehicle, "id">
//   ) => {
//     try {
//       const response = await fetch(`/v2/api/transport/bus/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${otpt}`,
//         },
//         body: JSON.stringify(updatedVehicle),
//       });
//       const data = await response.json();

//       setVehicles((prevVehicles) =>
//         prevVehicles.map((vehicle) =>
//           vehicle.id === id ? { ...data, id } : vehicle
//         )
//       );
//     } catch (error) {
//       console.error("Failed to update vehicle:", error);
//     }
//   };

//   const deleteVehicle = async (id: number) => {
//     try {
//       await fetch(`/v2/api/transport/bus/${id}`, {
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
//       value={{
//         vehicles,
//         fetchVehicles,
//         addVehicle,
//         deleteVehicle,
//         editVehicle,
//       }}
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
  editVehicle: (id: number, updatedVehicle: Omit<Vehicle, "id">) => void;
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

      const mappedData = data.map((vehicle: any) => ({
        ...vehicle,
        driverName: vehicle.driver.driverName,
        driverLicenseNumber: vehicle.driver.driverLicenseNo,
      }));

      setVehicles(mappedData);
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

      const updatedVehicle = {
        ...newVehicle,
        driverName: newVehicle.driver?.driverName || vehicle.driverName,
        driverLicenseNumber:
          newVehicle.driver?.driverLicenseNo || vehicle.driverLicenseNumber,
      };

      setVehicles((prevVehicles) => [...prevVehicles, updatedVehicle]);
    } catch (error) {
      console.error("Failed to add vehicle:", error);
    }
  };

  const editVehicle = async (
    id: number,
    updatedVehicle: Omit<Vehicle, "id">
  ) => {
    try {
      const response = await fetch(`/v2/api/transport/bus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otpt}`,
        },
        body: JSON.stringify(updatedVehicle),
      });
      const data = await response.json();

      const updatedData = {
        ...data,
        driverName: data.driver?.driverName || updatedVehicle.driverName,
        driverLicenseNumber:
          data.driver?.driverLicenseNo || updatedVehicle.driverLicenseNumber,
      };

      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === id ? { ...updatedData, id } : vehicle
        )
      );
    } catch (error) {
      console.error("Failed to update vehicle:", error);
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
      value={{
        vehicles,
        fetchVehicles,
        addVehicle,
        deleteVehicle,
        editVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
