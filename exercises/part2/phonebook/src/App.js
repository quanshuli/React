import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 123, id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showPerson, setShowPerson] = useState("");

  const personToShow =
    showPerson === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().startsWith(showPerson.toLowerCase())
        );

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} already exists!`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const addName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const showPersonHandler = (event) => {
    setShowPerson(event.target.value);
  };

  const Person = ({ person }) => {
    return (
      <li>
        {person.name} {person.number}
      </li>
    );
  };

  console.log(persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with
        <input value={showPerson} onChange={showPersonHandler} />
      </p>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={addName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={addNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug:{newName}</div>

      <h2>Numbers</h2>
      {personToShow.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
