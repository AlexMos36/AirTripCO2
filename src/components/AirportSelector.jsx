import React from "react";
import useCalculateFootprint from "../hooks/useCalculateFootprint";
import AirportInput from "../components/AirportInput";
import PassengerInput from "../components/PassengerInput";
import CalculateFootprintButton from "../components/CalculateFootprintButton";
import ResetButton from "../components/ResetButton";
import CarbonFootprintResult from "../components/CarbonFootprintResult";
import useAirportSelector from "../hooks/useAirportSelector";
import useFetchAirports from "../hooks/useFetchAirports";

const AirportSelector = () => {
  //Custom hook to handle footprint calculation logic
  const {
    footprint,
    calculateFootprint,
    footprintLoading,
    footprintError,
    resetFootprint,
  } = useCalculateFootprint();

  //Custom hook to fetch airport data
  const { airports, fetchAirportsLoading, fetchAirportsError } =
    useFetchAirports();

  //Custom hook to manage the selection of airports and passengers
  const {
    departureAirport,
    arrivalAirport,
    passengers,
    suggestions,
    selectedIndex,
    setDepartureAirport,
    setArrivalAirport,
    setPassengers,
    handleSearch,
    handleKeyDown,
    handleSuggestionClick,
    resetFields,
  } = useAirportSelector({ airports, resetFootprint });

  //Handle reset button
  const handleReset = () => {
    resetFields();
    resetFootprint();
  };

  //Check if the form is valid
  const isFormValid = departureAirport && arrivalAirport && passengers > 0;

  if (fetchAirportsLoading) return <p>Loading airports...</p>;
  if (fetchAirportsError)
    return <p>Error loading airports: {fetchAirportsError.message}</p>;

  return (
    <div>
      <div className="container mx-auto">
        <div className="bg-green-700 opacity-90 p-6 rounded-lg shadow-md">
          {/* Input field for selecting departure airport */}
          <AirportInput
            label="Departure Airport:"
            value={departureAirport || ""}
            onChange={(e) => {
              setDepartureAirport(e.target.value.toUpperCase());
              handleSearch(e.target.value.toUpperCase(), "departure");
            }}
            onKeyDown={(e) => handleKeyDown(e, "departure")}
            suggestions={suggestions.departure || []}
            selectedIndex={selectedIndex.departure}
            handleSuggestionClick={(airport) =>
              handleSuggestionClick(airport, "departure")
            }
            placeholder="Enter IATA code or country"
            onClear={() => setDepartureAirport("")}
          />
          {/* Input field for selecting arrival airport */}
          <AirportInput
            label="Arrival Airport:"
            value={arrivalAirport || ""}
            onChange={(e) => {
              setArrivalAirport(e.target.value.toUpperCase());
              handleSearch(e.target.value.toUpperCase(), "arrival");
            }}
            onKeyDown={(e) => handleKeyDown(e, "arrival")}
            suggestions={suggestions.arrival || []}
            selectedIndex={selectedIndex.arrival}
            handleSuggestionClick={(airport) =>
              handleSuggestionClick(airport, "arrival")
            }
            placeholder="Enter IATA code or country"
            onClear={() => setArrivalAirport("")}
          />
          {/* Input field for entering the number of passengers */}
          <PassengerInput
            passengers={passengers}
            setPassengers={setPassengers}
          />
          <div className="flex justify-between mb-4">
            {/* Button to calculate the carbon footprint */}
            <CalculateFootprintButton
              departureAirport={departureAirport}
              arrivalAirport={arrivalAirport}
              passengers={passengers}
              calculateFootprint={calculateFootprint}
              disabled={!isFormValid}
            />
            {/* Button to reset the form */}
            <ResetButton resetFields={handleReset} />
          </div>
          {footprintLoading && <p>Loading...</p>}
          {footprintError && (
            <p className="text-red-500">Error: {footprintError.message}</p>
          )}
          {/* Display the carbon footprint results */}
          <CarbonFootprintResult
            totalFootprint={footprint ? footprint.totalFootPrint : 0}
            footprintPerPerson={footprint ? footprint.footprintPerPassenger : 0}
          />
        </div>
      </div>
    </div>
  );
};

export default AirportSelector;
