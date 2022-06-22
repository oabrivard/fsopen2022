import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre }
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = [...new Set(books.flatMap(b => b.genres))]

  return (
    <div>
      <h2>books</h2>
      {genre ? <div>in genre <strong>{genre}</strong></div> : <></>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => ( // .filter(b => !genre || b.genres.includes(genre))
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
