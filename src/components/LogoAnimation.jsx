import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png"; // Adjust the path if necessary

const LogoAnimation = ({ onAnimationEnd }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [hasBounced, setHasBounced] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setHasBounced(true);
      if (onAnimationEnd) onAnimationEnd();
    }, 4000); // Match the duration of the animation

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="flex justify-center mt-6 relative">
      <img
        src={logo}
        alt="Logo"
        className={`h-48 md:h-48 lg:h-58 ${
          isAnimating ? "animate-bounceInFromBottom" : ""
        } ${
          hasBounced
            ? "transition-all duration-1000 ease-in-out transform translate-y-0"
            : ""
        }`}
      />
    </div>
  );
};

export default LogoAnimation;
