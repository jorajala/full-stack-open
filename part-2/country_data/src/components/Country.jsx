const Country = ({ country, showHandler }) => {
  return (
    <>
      {country.name.common}{" "}
      <button type="button" data={country.name.common} onClick={showHandler}>
        show
      </button>
      <br />
    </>
  );
};

export default Country;
