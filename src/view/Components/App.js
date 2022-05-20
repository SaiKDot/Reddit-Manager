import React, { useEffect } from 'react'
// import { HashRouter, Route } from 'react-router-dom'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
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
      <Routes>
          <Route path="/" element={<CardsPage/>} />
          {/* <Route path="/list"  element={ListPage} />
          <Route path="/batch" element={BatchPage} />         */}
      </Routes>
    </Router>
  )
}

export default App
