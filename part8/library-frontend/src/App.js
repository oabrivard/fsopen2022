import { useState } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateBookCache = (cache, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  addedBook.genres.forEach(g => {
    cache.updateQuery({ query: ALL_BOOKS, variables:{genre:g}}, (data) => {
      if (!data) {return}
      const { allBooks } = data
      return {
        allBooks: uniqByTitle(allBooks.concat(addedBook)),
      }
    })
  })
  cache.updateQuery({ query: ALL_BOOKS, variables:{genre:null}}, (data) => {
    if (!data) {return}
    const { allBooks } = data
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
  cache.updateQuery({ query: ALL_BOOKS}, (data) => {
    if (!data) {return}
    const { allBooks } = data
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(`${addedBook.title} added`)
      updateBookCache(client.cache, addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <>
            <button onClick={() => setPage('add')}>add book</button> 
            <button onClick={() => setPage('recommend')}>recommend</button> 
            <button onClick={logout}>logout</button>
          </>
          :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors token={token} show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommend'} />

      <LoginForm
        setToken={setToken}
        setPage={setPage}
        show={page === 'login'}
      />

    </div>
  )
}

export default App
