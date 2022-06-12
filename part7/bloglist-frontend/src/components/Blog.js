import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { vote, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector((state) => state.blogs ? state.blogs.find(e => e.id === id) : null)
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

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div>
        <a href={blog.url} rel='noreferrer' target='_blank'>{blog.url}</a><br />
        likes {blog.likes} {(blog.user) ? <button onClick={incrementLikes}>like</button> : <></>}
      </div>
      {(blog.user && blog.user.username === user.username) ? <button onClick={() => deleteBlog(blog)}>delete</button> : <></>}
      {blog.user ? <div>added by {blog.user.username}</div> : <></>}
    </div>
  )
}

export default Blog