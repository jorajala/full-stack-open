const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const Persons = (props) => {
  let persons = props.persons;
  console.log("persons component:", persons);
  let filter = props.filter;
  return (
    <>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <Person key={person.name} person={person} />
        ))}
    </>
  );
};

export default Persons;
