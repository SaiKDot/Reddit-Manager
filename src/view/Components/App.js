import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { getSavedPostsFromMain } from '../actions'
import ListPage from './Pages/ListPage'
import BatchPage from './Pages/BatchPage'
import CardsPage from './Pages/CardsPage'
import 'normalize.css'
import '../Styles/custom.css'
import '../Styles/simple-line-icons.min.css'



const App = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    // document.addEventListener('contextmenu', (event) => event.preventDefault())
    dispatch(getSavedPostsFromMain())

  },[])
  return (
    <Router>
      <Routes>
          <Route path="/" element={<CardsPage/>} />
          <Route path="/list"  element={<ListPage/>} />
          <Route path="/batch" element={BatchPage} />        
      </Routes>
    </Router>
  )
}

export default App
