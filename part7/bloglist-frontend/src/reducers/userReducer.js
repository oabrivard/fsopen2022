import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: { user:null, users:null },
  reducers: {
    setUser(state, action) {
      return { ...state, user:action.payload }
    },
    setUsers(state, action) {
      return { ...state, users:action.payload }
    }
  },
})

export const { setUser, setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const login = credentials => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(credentials)
      blogService.setToken(loggedUser.token)
      dispatch(setUser(loggedUser))
      return loggedUser
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 'red'))
    }
  }
}

export const logout = () => {
  return dispatch => {
    blogService.setToken(null)
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
