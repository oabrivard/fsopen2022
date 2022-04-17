import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const notificationStyle = {
    color: notification.color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const displayNotification = (newNotification) => {
    setNotification(newNotification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))       
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      displayNotification({ color: 'red', message: 'Wrong credentials' })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')       
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const userForm = () => (
    <form onSubmit={handleLogout}>
      <p>
        {user.name} logged-in
        <button type="submit">logout</button>
      </p>
    </form>
  )


  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(newBlog))
      displayNotification({ color: 'green', message: 'blog created' })
    } catch (exception) {
      displayNotification({ color: 'red', message: JSON.stringify(exception.response.data.error) })
    }
  }

  const createBlogForm = () => (
    <form onSubmit={addBlog}>
      Title <input value={title} onChange={({ target }) => setTitle(target.value)} /><br/>
      Author <input value={author} onChange={({ target }) => setAuthor(target.value)} /><br/>
      Url <input value={url} onChange={({ target }) => setUrl(target.value)} /><br/>
      <button type="submit">create</button>
    </form>  
  )

  const blogList = () => (
    blogs.map(blog =><Blog key={blog.id} blog={blog} />)
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user === null ? loginForm() :
        <div>
          {userForm()}
          {blogList()}
          <h2>create new</h2>
          {createBlogForm()}
        </div>
      }
    </div>
  )
}

export default App