import { useState } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthForm = ({ authors }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()

    const result = editAuthor({
      variables: { name: selectedOption.value, setBornTo: parseInt(born, 10) },
    })
    console.log('update author : ', result)
    setBorn('')
  }

  const options = authors.map(a => ({ value: a.name, label: a.name }))

  return (
    <div>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        born{' '}
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
        <br />
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? <><h3>set birth year</h3><BirthForm authors={authors} /></> : <></>}
    </div>
  )
}

export default Authors
