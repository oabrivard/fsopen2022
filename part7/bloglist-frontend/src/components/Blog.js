import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { vote, removeBlog } from '../reducers/blogReducer'

const BlogDetails = ({ userName, blog }) => {
  const dispatch = useDispatch()

  const incrementLikes = () => {
    dispatch(vote(blog))
  }

  const deleteBlog = () => {
    if (window.confirm(`Delete blog ${blog.title} ?`)) {
      dispatch(removeBlog(blog))
    }
  }

  return (<>
    <div>
      {blog.url}<br />
      likes {blog.likes} {(blog.user) ? <button onClick={incrementLikes}>like</button> : <></>}
    </div>
    {(blog.user && blog.user.username === userName) ? <button onClick={() => deleteBlog(blog)}>delete</button> : <></>}
  </>)
}

const Blog = ({ userName, blog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const simpleView = () => (<button onClick={() => setShowDetail(true)}>view</button>)

  const detailedView = () => (<>
    <button onClick={() => setShowDetail(false)}>hide</button>
    <BlogDetails userName={userName} blog={blog} />
  </>)

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title}<br />
        {blog.author} {showDetail ? detailedView() : simpleView()}
      </div>
    </div>
  )
}

export default Blog