import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) =>
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
    </div>
  </div>

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = (id, content) => {
    dispatch(vote(id))
    dispatch(setNotification(`you voted ${content}`,3))
  }

  return (<> {
    [...anecdotes].sort((a, b) => b.votes - a.votes)
    .filter(a => a.content.includes(filter))
    .map(a => <Anecdote key={a.id} anecdote={a} handleVote={handleVote} />)
  } </>
  )
}

export default AnecdoteList