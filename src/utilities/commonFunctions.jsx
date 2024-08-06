// Utility function to filter airports based on a query
const filterAirports = (query, airports) => {
  return airports.filter(
    (airport) =>
      airport.name.toLowerCase().includes(query.toLowerCase()) ||
      airport.country.toLowerCase().includes(query.toLowerCase()) ||
      airport.code.toLowerCase().includes(query.toLowerCase())
  );
};

// Handles updating suggestions and selected index based on query
export const handleSearch = (
  query,
  type,
  airports,
  setSuggestions,
  setSelectedIndex
) => {
  if (query.length >= 1) {
    const filteredSuggestions = filterAirports(query, airports);
    setSuggestions((prev) => ({ ...prev, [type]: filteredSuggestions }));
    setSelectedIndex((prev) => ({ ...prev, [type]: -1 }));
  } else {
    setSuggestions((prev) => ({ ...prev, [type]: [] }));
  }
};

// Utility function to update selected index based on key press
const updateSelectedIndex = (prevIndex, suggestionsLength, isIncrement) => {
  const change = isIncrement ? 1 : -1;
  return (prevIndex + change + suggestionsLength) % suggestionsLength;
};

// Handles key down events for suggestion navigation and selection
export const handleKeyDown = (
  e,
  type,
  suggestions,
  selectedIndex,
  setSelectedIndex,
  setDepartureAirport,
  setArrivalAirport,
  setSuggestions
) => {
  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      setSelectedIndex((prev) => {
        const nextIndex = updateSelectedIndex(
          prev[type],
          suggestions[type].length,
          true
        );
        return { ...prev, [type]: nextIndex };
      });
      break;
    case "ArrowUp":
      e.preventDefault();
      setSelectedIndex((prev) => {
        const nextIndex = updateSelectedIndex(
          prev[type],
          suggestions[type].length,
          false
        );
        return { ...prev, [type]: nextIndex };
      });
      break;
    case "Enter":
      e.preventDefault();
      if (selectedIndex[type] >= 0) {
        const selectedAirport = suggestions[type][selectedIndex[type]];
        const airportInfo = `${selectedAirport.code} - ${selectedAirport.name} (${selectedAirport.country})`;
        if (type === "departure") {
          setDepartureAirport(airportInfo);
        } else {
          setArrivalAirport(airportInfo);
        }
        setSuggestions((prev) => ({ ...prev, [type]: [] }));
      }
      break;
    case "Escape":
      e.preventDefault();
      setSuggestions((prev) => ({ ...prev, [type]: [] }));
      break;
    default:
      break;
  }
};

// Handles click events on suggestions
export const handleSuggestionClick = (
  airport,
  type,
  setDepartureAirport,
  setArrivalAirport,
  setSuggestions
) => {
  const airportInfo = `${airport.code} - ${airport.name} (${airport.country})`;
  if (type === "departure") {
    setDepartureAirport(airportInfo);
  } else {
    setArrivalAirport(airportInfo);
  }
  setSuggestions((prev) => ({ ...prev, [type]: [] }));
};
