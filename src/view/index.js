import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware } from 'redux'
import createIpc from 'redux-electron-ipc'
import reducers from './reducers'
import thunk from 'redux-thunk'
import { StylesProvider } from '@mui/styles'
import {setSavedLinks} from './actions'

const ipc = createIpc({
  'main:recievedLinks': (links, ...args) => setSavedLinks(args[0])
})

const store = createStore(reducers, applyMiddleware(thunk, ipc))

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider injectFirst={true}>
      <App />
    </StylesProvider>
  </Provider>,

  document.getElementById('root')
)
