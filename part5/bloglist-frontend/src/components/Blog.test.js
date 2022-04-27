import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog

  beforeEach(() => {
    blog = {
      user: {
        id: 'oabrivard'
      },
      title: 'a blog title',
      author: 'the blog author',
      url: 'the blog url',
      likes: 3107
    }
  })

  test('renders title but not url nor author by default', () => {
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'a blog title'
    )
    expect(div).toHaveTextContent(
      'the blog author'
    )
    expect(div).not.toHaveTextContent(
      'the blog url'
    )
    expect(div).not.toHaveTextContent(
      'likes 3107'
    )
  })

  test('renders all properties when [view] is clicked', async () => {
    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'a blog title'
    )
    expect(div).toHaveTextContent(
      'the blog author'
    )
    expect(div).toHaveTextContent(
      'the blog url'
    )
    expect(div).toHaveTextContent(
      'likes 3107'
    )
  })

  test('when [like] is clicked twice, its event handler is called twice', async () => {
    const mockHandler = jest.fn()

    render(<Blog userId='oabrivard' blog={blog} updateBlog={mockHandler} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
