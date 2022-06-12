import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector((state) => state.users.users ? state.users.users.find(e => e.id===id) : null)

  if (!user) return null

  return (
    <div>
      <h2>{ user.name }</h2>
      <h3>added blogs</h3>
      <ul>
        { user.blogs.map(b => <li key={b.id}>{b.title}</li>) }
      </ul>
    </div>
  )
}

export default User