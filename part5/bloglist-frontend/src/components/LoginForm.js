import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

    const success = handleLogin({ username, password })

    if (success) {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm