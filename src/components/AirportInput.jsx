import React from "react";

const AirportInput = ({
  label,
  value,
  onChange,
  onKeyDown,
  suggestions,
  selectedIndex,
  handleSuggestionClick,
  placeholder,
  onClear,
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {/* Clear button, visible only if there is a value in the input field  */}
        {value && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={onClear}
          >
            &times;
          </button>
        )}
      </div>
      {/* Suggestions dropdown, visible only if there are suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
          {suggestions.map((airport, index) => (
            <li
              key={airport.code}
              onMouseDown={() => handleSuggestionClick(airport)}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                selectedIndex === index
                  ? "bg-indigo-600 text-white"
                  : "text-gray-900"
              }`}
            >
              {/* Display airport code, name and country */}
              <span className="block truncate">
                {airport.code} - {airport.name} ({airport.country})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AirportInput;
