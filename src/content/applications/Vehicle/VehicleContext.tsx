//code with api
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// interface Vehicle {
//   id: number;
//   vehicleNumber: string;
//   registrationNumber: string;
//   driverName: string;
//   driversLicenseNumber: string;
//   capacity: number;
// }

// interface VehiclesContextType {
//   vehicles: Vehicle[];
//   addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
//   deleteVehicle: (id: number) => void;
// }

// const VehiclesContext = createContext<VehiclesContextType | undefined>(
//   undefined
// );

// export const useVehicles = () => {
//   const context = useContext(VehiclesContext);
//   if (!context) {
//     throw new Error("useVehicles must be used within a VehiclesProvider");
//   }
//   return context;
// };

// export const VehiclesProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
//   const apiUrl = "/v2/api/transport"; // Replace with your actual API URL
//   const otpt = sessionStorage.getItem("otptoken");

//   useEffect(() => {
//     fetch(`${apiUrl}/vehicles`, {
//       headers: {
//         Authorization: `Bearer ${otpt}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => setVehicles(data))
//       .catch((error) => console.error("Error fetching vehicles:", error));
//   }, [apiUrl, otpt]);

//   const addVehicle = (vehicle: Omit<Vehicle, "id">) => {
//     fetch(`${apiUrl}/vehicles`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${otpt}`,
//       },
//       body: JSON.stringify(vehicle),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setVehicles((prevVehicles) => [...prevVehicles, data]);
//       })
//       .catch((error) => console.error("Error adding vehicle:", error));
//   };

//   const deleteVehicle = (id: number) => {
//     fetch(`${apiUrl}/vehicles/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${otpt}`,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to delete vehicle");
//         }
//         setVehicles((prevVehicles) =>
//           prevVehicles.filter((vehicle) => vehicle.id !== id)
//         );
//       })
//       .catch((error) => console.error("Error deleting vehicle:", error));
//   };

//   return (
//     <VehiclesContext.Provider value={{ vehicles, addVehicle, deleteVehicle }}>
//       {children}
//     </VehiclesContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Vehicle {
  id: number;
  vehicleNumber: string;
  registrationNumber: string;
  driverName: string;
  driversLicenseNumber: string;
  capacity: number;
}

interface VehiclesContextType {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
  deleteVehicle: (id: number) => void;
}

const VehiclesContext = createContext<VehiclesContextType | undefined>(
  undefined
);

export const useVehicles = () => {
  const context = useContext(VehiclesContext);
  if (!context) {
    throw new Error("useVehicles must be used within a VehiclesProvider");
  }
  return context;
};

export const VehiclesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    // Initial mock data
    {
      id: 1,
      vehicleNumber: "V12345",
      registrationNumber: "RN67890",
      driverName: "John Doe",
      driversLicenseNumber: "DL12345",
      capacity: 50,
    },
    {
      id: 2,
      vehicleNumber: "V67890",
      registrationNumber: "RN12345",
      driverName: "Jane Smith",
      driversLicenseNumber: "DL67890",
      capacity: 40,
    },
  ]);

  const addVehicle = (vehicle: Omit<Vehicle, "id">) => {
    const newVehicle = {
      id: vehicles.length + 1, // Simulate auto-increment id
      ...vehicle,
    };
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
  };

  const deleteVehicle = (id: number) => {
    setVehicles((prevVehicles) =>
      prevVehicles.filter((vehicle) => vehicle.id !== id)
    );
  };

  return (
    <VehiclesContext.Provider value={{ vehicles, addVehicle, deleteVehicle }}>
      {children}
    </VehiclesContext.Provider>
  );
};
