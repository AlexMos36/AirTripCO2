import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//Function to fetch the list of airports from the API
const fetchAirports = async () => {
  const response = await axios.get(process.env.REACT_APP_AIRPORTS_URL);
  return response.data;
};

//Custom hook to fetch airports using React Query
function useFetchAirports() {
  return useQuery({
    queryKey: ["airports"],
    queryFn: fetchAirports,
  });
}

export default useFetchAirports;
