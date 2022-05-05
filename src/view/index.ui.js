import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './Reducers'
import thunk from 'redux-thunk'
import { StyledEngineProvider } from '@mui/material/styles'
import GlobalStyle from './Styles/font'
import { createBrowserHistory } from 'history'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <GlobalStyle />
      <App />
    </StyledEngineProvider>
  </Provider>,

  document.getElementById('root')
)
