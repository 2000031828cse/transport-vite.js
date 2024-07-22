import React, { createContext, useContext, useState, ReactNode } from "react";

interface Driver {
  id: number;
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  address: string;
}

interface DriverContextType {
  drivers: Driver[];
  addDriver: (driver: Driver) => void;
  deleteDriver: (id: number) => void;
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const useDrivers = (): DriverContextType => {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error("useDrivers must be used within a DriverProvider");
  }
  return context;
};

interface DriverProviderProps {
  children: ReactNode;
}

export const DriverProvider: React.FC<DriverProviderProps> = ({ children }) => {
  const [drivers, setDrivers] = useState<Driver[]>([
    // Initial dummy data
    { id: 1, name: "John Doe", phoneNumber: "1234567890", licenseNumber: "ABC123", address: "123 Main St" },
    { id: 2, name: "Jane Smith", phoneNumber: "0987654321", licenseNumber: "XYZ456", address: "456 Elm St" },
  ]);

  const addDriver = (driver: Driver) => {
    setDrivers((prevDrivers) => [...prevDrivers, driver]);
  };

  const deleteDriver = (id: number) => {
    setDrivers((prevDrivers) => prevDrivers.filter((driver) => driver.id !== id));
  };

  return (
    <DriverContext.Provider value={{ drivers, addDriver, deleteDriver }}>
      {children}
    </DriverContext.Provider>
  );
};
