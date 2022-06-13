import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, login, logout } from './reducers/userReducer'
import { Menu, Button } from 'semantic-ui-react'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.user)

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
    <form onSubmit={handleLogout} style={{ display: 'inline' }}>
      {user.name} logged-in <Button type='submit' compact>logout</Button>
    </form>
  )

  return (
    <div>
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <Menu>
            <Menu.Item as={Link} to='/'>blogs</Menu.Item>
            <Menu.Item as={Link} to='/users'>users</Menu.Item>
            <Menu.Item>{userForm()}</Menu.Item>
          </Menu>
          <Notification />
          <br />
          <Routes>
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/" element={<BlogList />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
