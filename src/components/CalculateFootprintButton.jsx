import React from "react";

const CalculateFootprintButton = ({
  departureAirport,
  arrivalAirport,
  passengers,
  calculateFootprint,
  disabled,
}) => {
  //Handle button clickevent
  const handleClick = () => {
    //Check if the departure and arrival airports are the same
    if (departureAirport === arrivalAirport) {
      //If there are the same, calculate footprint with sameAirport flag set to true
      calculateFootprint(departureAirport, arrivalAirport, passengers, true);
    } else {
      // Otherwise, calculate footprint normally
      calculateFootprint(departureAirport, arrivalAirport, passengers);
    }
  };
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`px-4 py-2 font-bold text-white bg-blue-500 rounded ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
      }`}
    >
      Calculate Footprint
    </button>
  );
};

export default CalculateFootprintButton;
