import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
    },
    appendAnecdote(state, action) {
      state.push(action.payload) // mutating state allowed here
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = id => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes
    console.log(state)
    const anecdoteToChange = state.find(a => a.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(id,changedAnecdote)
    const anecdotes = state.map(a =>
      a.id !== id ? a : updatedAnecdote
    )
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
