import { useState } from "react";
import useFetchAirports from "./useFetchAirports";
import useCalculateFootprint from "./useCalculateFootprint";
import {
  handleSearch,
  handleKeyDown,
  handleSuggestionClick,
} from "../utilities/commonFunctions";

function useAirportSelector() {
  //State to store selected departure and arrival airports
  const [departureAirport, setDepartureAirport] = useState();
  const [arrivalAirport, setArrivalAirport] = useState();

  //State to store number of passengers
  const [passengers, setPassengers] = useState();

  //State to store suggesetion for departure and arrival airports
  const [suggestions, setSuggestions] = useState({
    departure: [],
    arrival: [],
  });

  //State to store the selected index of suggestion for both departure and arrival
  const [selectedIndex, setSelectedIndex] = useState({
    departure: -1,
    arrival: -1,
  });

  const {
    data: airports,
    isLoading: airportsLoading,
    isError: airportsError,
  } = useFetchAirports();
  const {
    footprint,
    setFootprint,
    calculateFootprint,
    footprintLoading,
    footprintError,
  } = useCalculateFootprint();

  //Function to reset all state fields to their initial values
  const resetFields = () => {
    setDepartureAirport("");
    setArrivalAirport("");
    setPassengers(1);
    setSuggestions({ departure: [], arrival: [] });
    setSelectedIndex({ departure: -1, arrival: -1 });
    setFootprint(null);
  };

  //Return a state with all the state and handler functions
  return {
    departureAirport,
    arrivalAirport,
    passengers,
    footprint,
    suggestions,
    selectedIndex,
    setDepartureAirport,
    setArrivalAirport,
    setPassengers,
    handleSearch: (query, type) =>
      handleSearch(query, type, airports, setSuggestions, setSelectedIndex),
    handleKeyDown: (e, type) =>
      handleKeyDown(
        e,
        type,
        suggestions,
        selectedIndex,
        setSelectedIndex,
        setDepartureAirport,
        setArrivalAirport,
        setSuggestions
      ),
    handleSuggestionClick: (airport, type) =>
      handleSuggestionClick(
        airport,
        type,
        setDepartureAirport,
        setArrivalAirport,
        setSuggestions
      ),
    calculateFootprint: () =>
      calculateFootprint(departureAirport, arrivalAirport, passengers),
    resetFields,
    airportsLoading,
    airportsError,
    footprintLoading,
    footprintError,
  };
}

export default useAirportSelector;
