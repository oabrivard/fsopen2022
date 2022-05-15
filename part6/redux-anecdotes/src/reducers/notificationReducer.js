import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

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
export default notificationSlice.reducer
