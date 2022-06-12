import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'

const UserList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])


  const users = useSelector((state) => state.users.users)



  if (!users) return null

  const userList = () =>
    [...users]
      .sort((b1, b2) => b1.username - b2.username)
      .map((user) => (
        <tr key={user.id}>
          <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
          <td>{user.blogs.length}</td>
        </tr>
      ))

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Blogs created</td>
          </tr>
        </thead>
        <tbody>
          {userList()}
        </tbody>
      </table>
    </div>
  )
}

export default UserList