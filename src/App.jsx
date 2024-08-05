import React, { useState } from "react";
import AirportSelector from "./components/AirportSelector";
import LogoAnimation from "./components/LogoAnimation";
import Footer from "./components/Footer";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-custom-bg bg-cover bg-center bg-no-repeat flex flex-col">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Adjust the opacity value here */}
      <div className="relative flex flex-col items-center flex-grow p-4">
        <LogoAnimation onAnimationEnd={() => setShowForm(true)} />
        {showForm && (
          <div className="absolute flex justify-center w-full mt-60 lg:mt-60 animate-growFromDot">
            <div className="w-full max-w-xl rounded-lg shadow-md bg-opacity-80 pl-2 pr-2">
              {/* Adjust the opacity value here */}
              <AirportSelector />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
