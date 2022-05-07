import React, { useEffect } from 'react'
// import { HashRouter, Route } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import 'normalize.css'

import ListPage from './Pages/ListPage'
import BatchPage from './Pages/BatchPage'
import CardsPage from './Pages/CardsPage'

import '../Styles/custom.css'
import '../Styles/simple-line-icons.min.css'


const App = props => {
  // useEffect(() => {
  //   document.addEventListener('contextmenu', (event) => event.preventDefault())

  // },[])
  return (
    <Router>
      <Route path="/" exact component={CardsPage} />
      <Route path="/" exact component={ListPage} />
      <Route path="/batch" exact component={BatchPage} />
    </Router>
  )
}

export default App
