import { useState } from 'react'

const BlogDetails = ({ userName, blog, incrementLikes, deleteBlog }) => {
  return (<>
    <div>
      {blog.url}<br />
      likes {blog.likes} {(blog.user) ? <button onClick={incrementLikes}>like</button> : <></>}
    </div>
    {(blog.user && blog.user.username === userName) ? <button onClick={() => deleteBlog(blog)}>delete</button> : <></>}
  </>)
}

const Blog = ({ userName, blog, updateBlog, deleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const incrementLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(updatedBlog)
  }

  const simpleView = () => (<button onClick={() => setShowDetail(true)}>view</button>)

  const detailedView = () => (<>
    <button onClick={() => setShowDetail(false)}>hide</button>
    <BlogDetails userName={userName} blog={blog} incrementLikes={incrementLikes} deleteBlog={deleteBlog} />
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