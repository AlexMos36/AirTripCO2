import React from "react";

const CalculateFootprintButton = ({
  departureAirport,
  arrivalAirport,
  passengers,
  calculateFootprint,
  disabled,
}) => {
  const handleClick = () => {
    if (departureAirport === arrivalAirport) {
      calculateFootprint(departureAirport, arrivalAirport, passengers, true);
    } else {
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
