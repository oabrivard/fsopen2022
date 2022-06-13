import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import { Container } from 'semantic-ui-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Container style={{ marginTop: '3em' }}>
        <App />
      </Container>
    </Router>
  </Provider>
)
