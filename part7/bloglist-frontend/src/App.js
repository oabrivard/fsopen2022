import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from '../reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const toggableBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      return true
    } catch (exception) {
      setNotification('Wrong credentials', 'red')
      return false
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      toggableBlogFormRef.current.toggleVisibility()
      setNotification('blog created', 'green')
      return true
    } catch (exception) {
      console.log(exception)
      setNotification(JSON.stringify(exception.response.data.error), 'red')
      return false
    }
  }

  const updateBlog = async (blog) => {
    try {
      const data = {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      const updatedBlog = await blogService.update(blog.id, data)
      setBlogs(blogs.filter(b => b.id !== blog.id).concat(updatedBlog))
      return true
    } catch (exception) {
      console.log(exception)
      setNotification(JSON.stringify(exception.response.data.error), 'red')
      return false
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Delete blog ${blog.title} ?`)) {
      try {
        await blogService.remove(blog)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setNotification('blog deleted', 'green')
        return true
      } catch (exception) {
        console.log(exception)
        setNotification(JSON.stringify(exception.response.data.error), 'red')
        return false
      }
    }
  }

  const userForm = () => (
    <form onSubmit={handleLogout}>
      <p>
        {user.name} logged-in
        <button type="submit">logout</button>
      </p>
    </form>
  )

  const blogList = () => (
    [...blogs]
      .sort((b1, b2) => b2.likes - b1.likes)
      .map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} userName={user ? user.username : null} deleteBlog={deleteBlog} />)
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ?
        <LoginForm handleLogin={handleLogin} /> :
        <div>
          {userForm()}
          <Togglable buttonLabel='create' ref={toggableBlogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <br />
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App