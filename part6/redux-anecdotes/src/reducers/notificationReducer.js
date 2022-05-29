import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeoutID = -1

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return initialState
    }
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message,duration) => {
  return dispatch => {
    if (timeoutID >= 0) {
      clearTimeout(timeoutID)
      timeoutID = -1
    }
    dispatch(addNotification(message))
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, duration*1000)
  }
}

export default notificationSlice.reducer
