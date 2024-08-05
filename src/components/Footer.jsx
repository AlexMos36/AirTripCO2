import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-green-800 text-white py-2">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} AirTrip CO2. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
