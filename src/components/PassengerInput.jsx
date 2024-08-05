import React from "react";

const PassengerInput = ({ passengers, setPassengers }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400">
        Number of Passengers:
        <input
          type="number"
          value={passengers}
          onChange={(e) => setPassengers(parseInt(e.target.value, 10))}
          min="1"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-800 bg-gray-100"
        />
      </label>
    </div>
  );
};

export default PassengerInput;
