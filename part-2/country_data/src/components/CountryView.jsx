import CountryDetails from "./CountryDetails";
import Country from "./Country";

const CountryView = ({ countries, showHandler }) => {
  if (countries.length === 0) {
    return null;
  }
  if (countries.length > 9) {
    return <p>Too many matches, be more specific</p>;
  } else if (countries.length > 1) {
    return (
      <>
        {countries.map((country) => (
          <Country
            key={country.latlng}
            country={country}
            showHandler={showHandler}
          ></Country>
        ))}
      </>
    );
  } else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }
};

export default CountryView;
