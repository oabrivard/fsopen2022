import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ filter, onFilterChange }) => <div>
  filter shown with <input value={filter} onChange={onFilterChange} />
</div>

const PersonForm = ({ newName, onNameChange, newNumber, onNumberChange, onSubmitClick }) => <form>
  <div>
    name: <input value={newName} onChange={onNameChange} />
  </div>
  <div>
    number: <input value={newNumber} onChange={onNumberChange} />
  </div>
  <div>
    <button type="submit" onClick={onSubmitClick}>add</button>
  </div>
</form>

const Person = ({ person, onPersonDelete }) => <div>
  {person.name} {person.number} <button onClick={onPersonDelete}>delete</button>
</div>

const Persons = ({ persons, filter, deletePerson }) =>
  <div>
    {persons
      .filter(p => p.name.toUpperCase().includes(filter.toUpperCase()))
      .map(p => <Person key={p.id} person={p} onPersonDelete={() => deletePerson(p.id, p.name)} />)}
  </div>

const App = () => {
  const [persons, setPersons] = useState([])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onSubmitClick = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name == newName)
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService.update(existingPerson.id, updatedPerson)
        .then(person => {
          setPersons(persons.map(p => p.id !== person.id ? p : person))
        })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onFilterChange={onFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} onNameChange={onNameChange} newNumber={newNumber} onNumberChange={onNumberChange} onSubmitClick={onSubmitClick} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App