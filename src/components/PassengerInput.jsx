import React from "react";

const PassengerInput = ({ passengers, setPassengers }) => {
  //Handle change in the passenger input field
  const handleChange = (e) => {
    const value = e.target.value;
    // Set the value only if it is a number and within the limit of 1 to 300 or empty
    if (value === "" || (Number(value) > 0 && Number(value) <= 300)) {
      setPassengers(value);
    }
  };
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300">
        Number of Passengers:
        <input
          placeholder="max 300 passengers"
          type="number"
          value={passengers}
          onChange={handleChange}
          min="1"
          max={300}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-800 bg-gray-100"
        />
      </label>
    </div>
  );
};

export default PassengerInput;
