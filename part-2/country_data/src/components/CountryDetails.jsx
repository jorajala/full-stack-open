const CountryDetails = ({ country }) => {
  let languages = Object.values(country.languages);
  return (
    <div>
      <h2>{country.name.common}</h2>
      capital: {country.capital}
      <br />
      area: {country.area}
      <br />
      <h4>languages</h4>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
    </div>
  );
};

export default CountryDetails;
