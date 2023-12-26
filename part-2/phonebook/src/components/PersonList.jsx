import Person from "./Person";

const PersonList = (props) => {
  let persons = props.persons;
  let filter = props.filter;
  return (
    <>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <Person
            key={person.name}
            person={person}
            clickHandler={() => props.clickHandler(person)}
          />
        ))}
    </>
  );
};

export default PersonList;
