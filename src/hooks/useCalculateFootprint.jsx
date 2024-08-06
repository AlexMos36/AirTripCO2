import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

// API call function
const calculateFootprintAPI = async ({
  departureAirport,
  arrivalAirport,
  passengers,
}) => {
  //Extract the airports codes from the airport names
  const origin = departureAirport.split(" - ")[0];
  const destination = arrivalAirport.split(" - ")[0];

  //Make a GET request to the emission API to calculate the footprint
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

  //Calculate footprint per passenger and total footprint
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

  //Use React Query's useMutation hook to handle the API call
  const mutation = useMutation({
    mutationFn: calculateFootprintAPI,
    onSuccess: (data) => {
      setFootprint(data);
    },
  });

  //Function to calculate the footprint, handling the same airport scenario
  const calculateFootprint = (
    departureAirport,
    arrivalAirport,
    passengers,
    sameAirport = false
  ) => {
    if (sameAirport) {
      //Set the footprint to zero if the departure and arrival airports are the same
      setFootprint({ footprintPerPassenger: 0, totalFootPrint: 0 });
    } else {
      mutation.mutate({ departureAirport, arrivalAirport, passengers });
    }
  };

  //Function to reset the footprint state
  const resetFootprint = () => {
    setFootprint(null);
  };

  //Return the necessary state and function from the custom hook
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
