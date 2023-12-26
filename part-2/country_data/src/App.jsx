import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Country from "./components/Country";

function App() {
  const [newFilter, setNewFilter] = useState("");
  const [filterResult, setFilterResult] = useState([]);
  const [countryData, setCountryData] = useState({ null: null });

  useEffect(() => {
    console.log("effect: download all");
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountryData(response.data);
      });
  }, []);

  const handleFilterChange = (event) => {
    const nf = event.target.value.toLowerCase();
    setNewFilter(nf);
    setFilterResult(
      countryData.filter((country) =>
        country.name.common.toLowerCase().includes(nf)
      )
    );
  };

  return (
    <div>
      find countries
      <Filter filter={newFilter} handler={handleFilterChange} />
      <Country countries={filterResult} />
    </div>
  );
}

export default App;
