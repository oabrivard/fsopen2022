import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
        born
        bookCount
        id
      }
      id
    }
  }
`
export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      id
      title
      published
      author {
        name
        born
        bookCount
        id  
      }
      genres
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query Me {
    me {
      username
      favouriteGenre
    }
  }
`
