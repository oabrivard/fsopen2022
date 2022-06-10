import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

    dispatch(createBlog({ title, author, url }))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        Title <input id='title-input' value={title} onChange={({ target }) => setTitle(target.value)} /><br />
        Author <input id='author-input' value={author} onChange={({ target }) => setAuthor(target.value)} /><br />
        Url <input id='url-input' value={url} onChange={({ target }) => setUrl(target.value)} /><br />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm