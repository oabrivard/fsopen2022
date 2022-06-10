import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, login, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const toggableBlogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
    }
  }, [])

  const handleLogin = async (credentials) => {
    dispatch(login(credentials))
      .then(loggedUser => window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser)))
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
  }

  const userForm = () => (
    <form onSubmit={handleLogout}>
      <p>
        {user.name} logged-in
        <button type='submit'>logout</button>
      </p>
    </form>
  )

  const blogList = () =>
    [...blogs]
      .sort((b1, b2) => b2.likes - b1.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          userName={user ? user.username : null}
        />
      ))

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          {userForm()}
          <Togglable buttonLabel='create' ref={toggableBlogFormRef}>
            <BlogForm />
          </Togglable>
          <br />
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
