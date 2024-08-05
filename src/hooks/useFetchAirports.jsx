import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// UTILIZZATO REACT-QUERY PER GESTIRE IL FETCH DEGLI AEROPORTI
const fetchAirports = async () => {
  const response = await axios.get(process.env.REACT_APP_AIRPORTS_URL);
  return response.data;
};

// HOOK PERSONALIZZATO PER RICHIESTA DEGLI AEROPORTI
function useFetchAirports() {
  return useQuery({
    queryKey: ["airports"],
    queryFn: fetchAirports,
  });
}

export default useFetchAirports;
