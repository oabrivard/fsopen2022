import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  },
})

export const { setUser } = userSlice.actions

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
