import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {
  const result1 = useQuery(ALL_BOOKS)
  const result2 = useQuery(ME)
  

  if (!props.show) {
    return null
  }

  if (result1.loading || result2.loading) {
    return <div>loading...</div>
  }

  const books = result1.data.allBooks
  const genre = result2.data.me.favouriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <strong>{props.genre}</strong></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(b => b.genres.includes(genre)).map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
