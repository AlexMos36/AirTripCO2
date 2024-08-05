import { useState } from "react";
import useFetchAirports from "./useFetchAirports";
import useCalculateFootprint from "./useCalculateFootprint";
import {
  handleSearch,
  handleKeyDown,
  handleSuggestionClick,
} from "../utils/utils";

function useAirportSelector() {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [suggestions, setSuggestions] = useState({
    departure: [],
    arrival: [],
  });
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

  const resetFields = () => {
    setDepartureAirport("");
    setArrivalAirport("");
    setPassengers(1);
    setSuggestions({ departure: [], arrival: [] });
    setSelectedIndex({ departure: -1, arrival: -1 });
    setFootprint(null);
  };

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
