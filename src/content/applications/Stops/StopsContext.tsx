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
//   lat: number;
//   lng: number;
//   landmark: string;
//   pickUp: string;
//   dropTime: string;
// }

// interface StopsContextType {
//   stops: Stop[];
//   addStop: (stop: Omit<Stop, "id">) => void;
//   editStop: (id: number, updatedStop: Omit<Stop, "id">) => void;
//   deleteStop: (id: number) => void;
// }

// const StopsContext = createContext<StopsContextType | undefined>(undefined);

// export const useStops = () => {
//   const context = useContext(StopsContext);
//   if (!context) {
//     throw new Error("useStops must be used within a StopsProvider");
//   }
//   return context;
// };

// export const StopsProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [stops, setStops] = useState<Stop[]>([]);
//   const apiUrl = "/v2/api/transport"; // Replace with your actual API URL
//   const otpt = sessionStorage.getItem("otptoken");

//   useEffect(() => {
//     fetch(`${apiUrl}/stops`, {
//       headers: {
//         Authorization: `Bearer ${otpt}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => setStops(data))
//       .catch((error) => console.error("Error fetching stops:", error));
//   }, [apiUrl, otpt]);

//   const addStop = (stop: Omit<Stop, "id">) => {
//     fetch(`${apiUrl}/stops`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${otpt}`,
//       },
//       body: JSON.stringify(stop),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setStops((prevStops) => [...prevStops, data]);
//       })
//       .catch((error) => console.error("Error adding stop:", error));
//   };

//   const editStop = (id: number, updatedStop: Omit<Stop, "id">) => {
//     fetch(`${apiUrl}/stops/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${otpt}`,
//       },
//       body: JSON.stringify(updatedStop),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setStops((prevStops) =>
//           prevStops.map((stop) => (stop.id === id ? data : stop))
//         );
//       })
//       .catch((error) => console.error("Error editing stop:", error));
//   };

//   const deleteStop = (id: number) => {
//     fetch(`${apiUrl}/stops/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${otpt}`,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to delete stop");
//         }
//         setStops((prevStops) => prevStops.filter((stop) => stop.id !== id));
//       })
//       .catch((error) => console.error("Error deleting stop:", error));
//   };

//   return (
//     <StopsContext.Provider value={{ stops, addStop, editStop, deleteStop }}>
//       {children}
//     </StopsContext.Provider>
//   );
// };

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
  fare: string;
}

interface StopsContextProps {
  stops: Stop[];
  fetchStops: () => Promise<void>;
  addStop: (stop: Stop) => void;
  deleteStop: (id: number) => void;
  updateStop: (stop: Stop) => void;
}

const StopsContext = createContext<StopsContextProps | undefined>(undefined);

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

  const apiUrl = "/v2/api/transport"; // Update with your actual API URL

  const fetchStops = async () => {
    const otpt = sessionStorage.getItem("otptoken");
    try {
      const response = await fetch(`${apiUrl}/stops`, {
        headers: {
          Authorization: `Bearer ${otpt}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch stops");
      }
      const data = await response.json();
      setStops(data);
    } catch (error) {
      console.error("Error fetching stops:", error);
    }
  };

  useEffect(() => {
    fetchStops();
  }, []);

  const addStop = async (stop: Stop) => {
    const otpt = sessionStorage.getItem("otptoken");
    const stopPayload = {
      address: stop.address,
      lat: stop.lat,
      lng: stop.lng,
      landmark: stop.landmark,
      pickUp: stop.pickUp,
      dropTime: stop.dropTime,
      fare: stop.fare,
    };

    try {
      const response = await fetch(`${apiUrl}/stops`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otpt}`,
        },
        body: JSON.stringify(stopPayload),
      });
      if (!response.ok) {
        throw new Error("Failed to add stop");
      }
      const data = await response.json();
      setStops((prevStops) => [...prevStops, data]);
    } catch (error) {
      console.error("Error adding stop:", error);
    }
  };

  const deleteStop = async (id: number) => {
    const otpt = sessionStorage.getItem("otptoken");
    try {
      const response = await fetch(`${apiUrl}/stops/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${otpt}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete stop");
      }
      setStops((prevStops) => prevStops.filter((stop) => stop.id !== id));
    } catch (error) {
      console.error("Error deleting stop:", error);
    }
  };

  const updateStop = async (updatedStop: Stop) => {
    const otpt = sessionStorage.getItem("otptoken");
    const stopPayload = {
      address: updatedStop.address,
      lat: updatedStop.lat,
      lng: updatedStop.lng,
      landmark: updatedStop.landmark,
      pickUp: updatedStop.pickUp,
      dropTime: updatedStop.dropTime,
      fare: updatedStop.fare,
    };

    try {
      const response = await fetch(`${apiUrl}/stops/${updatedStop.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otpt}`,
        },
        body: JSON.stringify(stopPayload),
      });
      if (!response.ok) {
        throw new Error("Failed to update stop");
      }
      await response.json();
      setStops((prevStops) =>
        prevStops.map((stop) =>
          stop.id === updatedStop.id ? updatedStop : stop
        )
      );
    } catch (error) {
      console.error("Error updating stop:", error);
    }
  };

  return (
    <StopsContext.Provider
      value={{ stops, fetchStops, addStop, deleteStop, updateStop }}
    >
      {children}
    </StopsContext.Provider>
  );
};
