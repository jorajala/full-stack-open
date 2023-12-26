const Country = ({ countries }) => {
  console.log("country", countries);
  if (countries.length === 0) {
    return null;
  }
  if (countries.length > 9) {
    return <>Too many matches, be more specific</>;
  } else if (countries.length > 1) {
    return (
      <>
        {countries.map((country) => (
          <div key={country.latlng}>
            {country.name.common}
            <br />
          </div>
        ))}
      </>
    );
  } else if (countries[0] !== null) {
    let c = countries[0];
    let languages = Object.values(c.languages);
    return (
      <>
        <h2>{c.name.common}</h2>
        capital: {c.capital}
        <br />
        area: {c.area}
        <br />
        <h4>languages</h4>
        <ul>
          {languages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={countries[0].flags.png}></img>
      </>
    );
  }
};

export default Country;
