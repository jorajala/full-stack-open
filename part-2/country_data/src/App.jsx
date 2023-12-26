import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryView from "./components/CountryView";

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

  const handleShowClick = (event) => {
    let countryName = event.target.attributes.data.value;
    setNewFilter(countryName);
    setFilterResult(
      countryData.filter((country) => country.name.common === countryName)
    );
  };

  return (
    <div>
      find countries
      <Filter filter={newFilter} handler={handleFilterChange} />
      <br />
      <CountryView countries={filterResult} showHandler={handleShowClick} />
    </div>
  );
}

export default App;
