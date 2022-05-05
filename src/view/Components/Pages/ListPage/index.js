import React, { useEffect, useRef, useState, useCallback,useLayoutEffect } from 'react'
import Draggable from 'react-draggable'
import _ from 'underscore'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import ListBody from './ListBody' 
import Header from '../../Header'
import NewTaskModal from '../../Modal/NewTaskModal' 
import { fetchTaskList } from '../../../Actions/task' 

import Dropper from './Dropper'

const ListPage = (props) => {
  const dispatch = useDispatch()  
  const containerRef = useRef(null) 

  // useEffect(() => {
     
  //  const interval = setInterval(() => {

  //     polling('This will run every second!');
      
  //  }, 1000);

  //  return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   setWidth(sidePanel_width)
     
  // }, [sidePanel_width])

  // const polling = () => {
      
  //   dispatch(fetchTaskList())
  // }
  // const fetchICons = async() => {     

  //    getIcons(function(data){
  //       console.log({data}); 
  //     });
     
  // }
  return (
    <Container>
      <NewTaskModal />
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
