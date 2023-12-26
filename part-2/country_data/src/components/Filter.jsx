const Filter = (props) => {
  console.log("filter", props);
  return (
    <>
      <input value={props.filter} onChange={props.handler}></input>
    </>
  );
};

export default Filter;
