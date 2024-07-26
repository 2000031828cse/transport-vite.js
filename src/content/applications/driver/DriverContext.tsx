import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Driver {
  id: number;
  driverName: string;
  driverMobile: string;
  driverAddress: string;
  driverLicenseNo: string;
}

interface DriverContextType {
  drivers: Driver[];
  fetchDrivers: () => void;
  addDriver: (driver: Omit<Driver, "id">) => void;
  updateDriver: (
    driverLicenseNo: string,
    driver: Omit<Driver, "id" | "driverLicenseNo">
  ) => void;
  deleteDriver: (id: number) => void;
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);
const otpt = sessionStorage.getItem("otptoken");

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
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const fetchDrivers = async () => {
    try {
      const response = await fetch("/v2/api/transport/drivers");
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error("Failed to fetch drivers:", error);
    }
  };

  const addDriver = async (driver: Omit<Driver, "id">) => {
    try {
      const response = await fetch("/v2/api/transport/drivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otpt}`,
        },
        body: JSON.stringify(driver),
      });
      const newDriver = await response.json();
      setDrivers((prevDrivers) => [...prevDrivers, newDriver]);
    } catch (error) {
      console.error("Failed to add driver:", error);
    }
  };

  const updateDriver = async (
    driverLicenseNo: string,
    driver: Omit<Driver, "id" | "driverLicenseNo">
  ) => {
    try {
      const response = await fetch(
        `/v2/api/transport/drivers/${driverLicenseNo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${otpt}`,
          },
          body: JSON.stringify(driver),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update driver: ${response.statusText}`);
      }

      const updatedDriver = await response.json();
      setDrivers((prevDrivers) =>
        prevDrivers.map((d) =>
          d.driverLicenseNo === driverLicenseNo ? updatedDriver : d
        )
      );
    } catch (error) {
      console.error("Failed to update driver:", error);
    }
  };

  const deleteDriver = async (id: number) => {
    try {
      await fetch(`/v2/api/transport/drivers/${id}`, {
        method: "DELETE",
      });
      setDrivers((prevDrivers) =>
        prevDrivers.filter((driver) => driver.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete driver:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <DriverContext.Provider
      value={{ drivers, fetchDrivers, addDriver, updateDriver, deleteDriver }}
    >
      {children}
    </DriverContext.Provider>
  );
};
