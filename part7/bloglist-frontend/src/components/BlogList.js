import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Toggable'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const toggableBlogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogList = () =>
    [...blogs]
      .sort((b1, b2) => b2.likes - b1.likes)
      .map((blog) => (
        <div key={blog.id} style={blogStyle} className='blog'>
          <div>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link><br />
            {blog.author}
          </div>
        </div>
      ))

  return (
    <div>
      <Togglable buttonLabel='create' ref={toggableBlogFormRef}>
        <BlogForm />
      </Togglable>
      <br />
      {blogList()}
    </div>
  )
}

export default BlogList