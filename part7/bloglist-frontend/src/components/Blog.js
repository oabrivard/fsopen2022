import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { vote, removeBlog } from '../reducers/blogReducer'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ blog, dispatch }) => {
  const [comment, setComment] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

    dispatch(addComment(blog, comment)).then((success) => {
      if (success) {
        setComment('')
      }
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        id='comment'
        type='text'
        value={comment}
        name='comment'
        onChange={({ target }) => setComment(target.value)}
      />
      <button type='submit'>add comment</button>
    </form>
  )
}

const Blog = () => {
  const id = useParams().id
  const blog = useSelector((state) =>
    state.blogs ? state.blogs.find((e) => e.id === id) : null
  )
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.user)
  const navigate = useNavigate()

  const incrementLikes = () => {
    dispatch(vote(blog))
  }

  const deleteBlog = () => {
    if (window.confirm(`Delete blog ${blog.title} ?`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }

  const comments = (comments) => comments.map((c, i) => <li key={i}>{c}</li>)

  if (!blog) return null

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url} rel='noreferrer' target='_blank'>
          {blog.url}
        </a>
        <br />
        likes {blog.likes}{' '}
        {blog.user ? <button onClick={incrementLikes}>like</button> : <></>}
      </div>
      {blog.user && blog.user.username === user.username ? (
        <button onClick={() => deleteBlog(blog)}>delete</button>
      ) : (
        <></>
      )}
      {blog.user ? <div>added by {blog.user.username}</div> : <></>}
      <h3>comments</h3>
      <CommentForm blog={blog} dispatch={dispatch} />
      {blog.comments && blog.comments.length > 0 ? (
        <ul>{comments(blog.comments)}</ul>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Blog
