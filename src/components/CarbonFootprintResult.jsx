import React from "react";
import FlipNumbers from "react-flip-numbers";

const CarbonFootprintResult = ({
  totalFootprint = 0,
  footprintPerPerson = 0,
}) => (
  <div className="mt-4 p-4 border border-gray-200 rounded-lg w-full max-w-md mx-auto">
    <h2 className="text-xl font-semibold text-white flex justify-center">
      RESULTS
    </h2>
    <div className="text-gray-300 flex justify-center items-center">
      <p>Total CO2: </p>
      <FlipNumbers
        height={20}
        width={15}
        color="white"
        background="gray"
        play
        duration={2} // Duration of the flip animation
        numbers={`${totalFootprint}`}
      />
      <p> kg</p>
    </div>
    <div className="text-gray-300 flex justify-center items-center mt-2">
      <p>CO2 per Passenger: </p>
      <FlipNumbers
        height={20}
        width={15}
        color="white"
        background="gray"
        play
        duration={2} // Duration of the flip animation
        numbers={`${footprintPerPerson}`}
      />
      <p> kg</p>
    </div>
  </div>
);

export default CarbonFootprintResult;
