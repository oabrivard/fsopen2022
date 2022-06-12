import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload) // mutating state allowed here
    },
    updateBlog(state, action) {
      return state.filter(b => b.id !== action.payload.id).concat(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter(b => b.id !== action.payload.id)
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
})

const { appendBlog, updateBlog, deleteBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification('blog created', 'green'))
    } catch (exception) {
      dispatch(setNotification(JSON.stringify(exception.response.data.error), 'red'))
    }
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    try {
      await blogService.remove(blog)
      dispatch(deleteBlog(blog))
      dispatch(setNotification('blog deleted', 'green'))
    } catch (exception) {
      dispatch(setNotification(JSON.stringify(exception.response.data.error), 'red'))
    }
  }
}

export const vote = blog => {
  return async dispatch => {
    try {
      const data = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      const updatedBlog = await blogService.update(blog.id, data)
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      dispatch(setNotification(JSON.stringify(exception.response.data.error), 'red'))
    }
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addComment(blog.id, comment)
      dispatch(updateBlog(updatedBlog))
      return true
    } catch (exception) {
      dispatch(setNotification(JSON.stringify(exception.response.data.error), 'red'))
      return false
    }
  }
}

export default blogSlice.reducer
