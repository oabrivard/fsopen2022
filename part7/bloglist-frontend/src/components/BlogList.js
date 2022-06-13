import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Toggable'
import { Header, List } from 'semantic-ui-react'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const toggableBlogFormRef = useRef()

  const blogList = () =>
    [...blogs]
      .sort((b1, b2) => b2.likes - b1.likes)
      .map((blog) => (
        <List.Item key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
        </List.Item>
      ))

  return (
    <div>
      <Header as='h1'>Blogs</Header>
      <Togglable buttonLabel='create' ref={toggableBlogFormRef}>
        <BlogForm />
      </Togglable>
      <List>
        {blogList()}
      </List>
    </div>
  )
}

export default BlogList
