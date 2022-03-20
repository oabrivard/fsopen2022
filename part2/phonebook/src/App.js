import { useState } from 'react'

const Filter = ({ filter, onFilterChange }) => <div>
  filter shown with <input value={filter} onChange={onFilterChange} />
</div>

const PersonForm = ({newName, onNameChange, newNumber, onNumberChange, onSubmitClick}) => <form>
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

const Person = ({ person }) => <div>
  {person.name} {person.number}
</div>

const Persons = ({ persons, filter }) => <div>
  {persons.filter(p => p.name.toUpperCase().includes(filter.toUpperCase())).map(p => <Person key={p.name} person={p} />)}
</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    if (persons.find(p => p.name == newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onFilterChange={onFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} onNameChange={onNameChange} newNumber={newNumber} onNumberChange={onNumberChange} onSubmitClick={onSubmitClick} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App