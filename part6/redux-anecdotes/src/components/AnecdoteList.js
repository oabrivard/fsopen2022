import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) =>
  <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => handleVote(anecdote.id)}>vote</button>
    </div>
  </div>

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVote = (id) => dispatch(vote(id))

  return (<> {
    [...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote => <Anecdote anecdote={anecdote} handleVote={handleVote} />)
  } </>
  )
}

export default AnecdoteList