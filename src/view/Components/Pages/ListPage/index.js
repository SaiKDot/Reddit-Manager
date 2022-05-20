import React, { useEffect, useRef, useState, useCallback,useLayoutEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Draggable from 'react-draggable'
import _ from 'underscore'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import styled from 'styled-components'  
import ListBody from './ListBody' 
import Header from '../../Header'
 
import { fetchTaskList } from '../../../actions/task' 

 

const ListPage = (props) => {
  const dispatch = useDispatch()  
  const containerRef = useRef(null)
  const location = useLocation()
  useEffect(() =>  {
    console.log(location)

  },[])
  return (
    <Container>      
      <Header />

      <ListContainer ref={containerRef}>
       
      </ListContainer>
    </Container>
  )
}

const Container = styled.div`
  background-color: #fff;
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const ListContainer = styled.div`
  height: calc(100% - 45px);
  width: 100%;
  position: absolute;
  top: 45px;
`
const ListPanel = styled.div`
  /* width: calc(100% - ${(props) => props.width}px); */
  height: 100%;
  /* width : ${({ width }) => width}; */
  display: inline-block;
  overflow-x: scroll;
  overflow-y: hidden;
  width: calc(100vw - ${(props) => props.width}px);
`

const Xcontainer = styled.div`
  
  height: 100%;  
  max-width: fit-content;
  display: inline-flex;
  flex-direction: column;
`



export default ListPage
