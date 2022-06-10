import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeoutID = -1

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return initialState
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, color, duration = 5) => {
  return (dispatch) => {
    console.log('dispatch = ')
    if (timeoutID >= 0) {
      clearTimeout(timeoutID)
      timeoutID = -1
    }
    dispatch(addNotification({ message, color }))
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
