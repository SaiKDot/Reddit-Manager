 
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'
import { changePanelWidth, toggleSidePanel, unSelectAll } from '../../../Actions'
import Tree from './Tree'

const SidePanel = props => {
  const structure = [
    {
      name: 'All Downloads',
      icon: 'downloads',
      id: 'all_downloads',
      children: [
        {
          icon: 'compressed',
          name: 'Compressed',
          id: 'compressed_all',
        },
        {
          id: 'image_all',
          name: 'Images',
          icon: 'image',
        },
        {
          id: 'music_all',
          name: 'Music',
          icon: 'music',
        },
        {
          id: 'video_all',
          name: 'Video',
          icon: 'video',
        },
        {
          id: 'document_all',
          name: 'Documents',
          icon: 'document',
        },
      ],
    },
    {
      name: 'Unfinished',
      icon: 'downloads',
      id: 'unfinished_downloads',
      children: [
        {
          icon: 'compressed',
          name: 'Compressed',
          id: 'compressed_uf',
        },
        {
          id: 'image_uf',
          name: 'Images',
          icon: 'image',
        },
        {
          id: 'music_uf',
          name: 'Music',
          icon: 'music',
        },
        {
          id: 'video_uf',
          name: 'Video',
          icon: 'video',
        },
        {
          id: 'document_uf',
          name: 'Documents',
          icon: 'document',
        },
      ],
    },
  ]
const panelRef = useRef()
const dispatch = useDispatch()

  return (
    <Container ref={panelRef} onClick={() => dispatch(unSelectAll())}>
      <Header>
        <Text>Categories</Text>
        <Close onClick={() => { console.log('click'); dispatch(toggleSidePanel())}}>X</Close>
      </Header>
      <Panel>
        <Tree data={structure} />
      </Panel>
    </Container>
  )
}
const Container = styled.div`
  
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  
  
  
`
const Text = styled.span`
  font-size: 13px;
  /* font-size: 1.5vw; */
  position: relative;
  width: 80%;
`
const Header = styled.div`
  background-color: #f5f5f5;

  

`
const Close = styled.span`
  position: absolute;
  right: 1px;
  width: 20%;
  cursor: pointer;
  text-align: right;
`
const Panel = styled.div`
  width: calc(100% - 4px);
`


export default SidePanel