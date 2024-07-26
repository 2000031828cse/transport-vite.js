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

interface StopsContextType {
  stops: Stop[];
  addStop: (stop: Omit<Stop, "id">) => void;
  editStop: (id: number, updatedStop: Omit<Stop, "id">) => void;
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

export const StopsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [stops, setStops] = useState<Stop[]>([]);
  const apiUrl = "/v2/api/transport"; // Replace with your actual API URL
  const otpt = sessionStorage.getItem("otptoken");

  useEffect(() => {
    fetch(`${apiUrl}/stops`, {
      headers: {
        Authorization: `Bearer ${otpt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setStops(data))
      .catch((error) => console.error("Error fetching stops:", error));
  }, [apiUrl, otpt]);

  const addStop = (stop: Omit<Stop, "id">) => {
    fetch(`${apiUrl}/stops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${otpt}`,
      },
      body: JSON.stringify(stop),
    })
      .then((response) => response.json())
      .then((data) => {
        setStops((prevStops) => [...prevStops, data]);
      })
      .catch((error) => console.error("Error adding stop:", error));
  };

  const editStop = (id: number, updatedStop: Omit<Stop, "id">) => {
    fetch(`${apiUrl}/stops/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${otpt}`,
      },
      body: JSON.stringify(updatedStop),
    })
      .then((response) => response.json())
      .then((data) => {
        setStops((prevStops) =>
          prevStops.map((stop) => (stop.id === id ? data : stop))
        );
      })
      .catch((error) => console.error("Error editing stop:", error));
  };

  const deleteStop = (id: number) => {
    fetch(`${apiUrl}/stops/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${otpt}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete stop");
        }
        setStops((prevStops) => prevStops.filter((stop) => stop.id !== id));
      })
      .catch((error) => console.error("Error deleting stop:", error));
  };

  return (
    <StopsContext.Provider value={{ stops, addStop, editStop, deleteStop }}>
      {children}
    </StopsContext.Provider>
  );
};
