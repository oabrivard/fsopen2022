import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from './Todo'

describe('<Todo />', () => {
  let todo

  beforeEach(() => {
    todo = {
      text: 'a todo text',
      done: false
    }
  })

  test('renders text correctly', () => {
    const { container } = render(<Todo todo={todo} deleteTodo={()=>{}} completeTodo={()=>{}} />)
    const div = container.querySelector('.todo')

    expect(div).toHaveTextContent(
      'a todo text'
    )
  })
})
