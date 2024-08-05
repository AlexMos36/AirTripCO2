import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

// API call function
const calculateFootprintAPI = async ({
  departureAirport,
  arrivalAirport,
  passengers,
}) => {
  const origin = departureAirport.split(" - ")[0];
  const destination = arrivalAirport.split(" - ")[0];

  const response = await axios.get(process.env.REACT_APP_EMISSION_URL, {
    auth: {
      username: process.env.REACT_APP_EMISSION_API_KEY,
    },
    params: {
      "segments[0][origin]": origin,
      "segments[0][destination]": destination,
      cabin_class: "economy",
    },
  });

  const footprintPerPassenger = response.data.footprint;
  const totalFootPrint = response.data.footprint * Number(passengers);
  return {
    footprintPerPassenger,
    totalFootPrint,
  };
};

// Custom hook for calculating footprint
function useCalculateFootprint() {
  const [footprint, setFootprint] = useState(null);

  const mutation = useMutation({
    mutationFn: calculateFootprintAPI,
    onSuccess: (data) => {
      setFootprint(data);
    },
  });

  const calculateFootprint = (
    departureAirport,
    arrivalAirport,
    passengers,
    sameAirport = false
  ) => {
    if (sameAirport) {
      setFootprint({ footprintPerPassenger: 0, totalFootPrint: 0 });
    } else {
      mutation.mutate({ departureAirport, arrivalAirport, passengers });
    }
  };

  const resetFootprint = () => {
    setFootprint(null);
  };

  return {
    footprint,
    setFootprint,
    calculateFootprint,
    resetFootprint,
    footprintLoading: mutation.isLoading,
    footprintError: mutation.isError,
  };
}

export default useCalculateFootprint;
