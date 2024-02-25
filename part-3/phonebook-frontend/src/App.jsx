import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import Notification from "./components/Notification";
import personsService from "./services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationData, setNotificationData] = useState({
    message: null,
    isError: false,
  });

  useEffect(() => {
    console.log("effect");
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} already exists, do you want to replace the number?`
        )
      ) {
        updateNumber();
      }
    } else {
      createPerson();
    }
  };

  const updateNumber = () => {
    console.log("updateNumber", newName, newNumber);

    let person = persons.find((person) => person.name === newName);
    let updatedPerson = { ...person, number: newNumber };

    personsService.update(updatedPerson.id, updatedPerson).then((response) => {
      setPersons(
        persons.map((person) => (person.id !== response.id ? person : response))
      );
    });
  };

  const createPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personsService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      showNotification(`Created "${newName}"`, false);
    }).catch(error => {
      console.log(error.response.data);
      showNotification(error.response.data.error, true);
    });
  };

  const deletePerson = (person) => {
    console.log("deletePerson", person);
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      personsService
        .remove(person.id)
        .then((response) => {
          console.log("delete response", response);
          setPersons(
            persons.filter((savedPerson) => savedPerson.id !== person.id)
          );
        })
        .catch(() => {
          showNotification(
            `"${person.name}" has already been removed from server`,
            true
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  const showNotification = (message, isError) => {
    setNotificationData({ message, isError });
    setTimeout(() => {
      setNotificationData({ message: null, isError: null });
    }, 3000);
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase());
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification data={notificationData} />
      <Filter filter={newFilter} handler={handleFilterChange} />
      <h3>Add new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        personHandler={handlePersonChange}
        numberHandler={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>

      <PersonList
        persons={persons}
        filter={newFilter}
        clickHandler={deletePerson}
      />
    </div>
  );
};

export default App;
