import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Links from './Links'
const Twitter = React.memo(() => {
  console.log('Twitter')

  const [dragging, setDragging] = useState(false)
  var enterTarget = useRef(null)

  const handleDragEnter = useCallback((event) => {
    enterTarget.current = event.target
    setDragging((value) => true)
    event.stopPropagation()
    event.preventDefault()
  })

  const handleDragLeave = useCallback((event) => {
    console.log(
      'on drag leave: currentTarget: ' +
        event.target.id +
        ', old target: ' +
        enterTarget.current.id
    )
    if (enterTarget.current == event.target) {
      setDragging((value) => false)
      event.stopPropagation()
      event.preventDefault()
    }
  }, [])
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
  })
  const handleDrop = useCallback((e) => {
    e.preventDefault()
    console.log(e)
    e.stopPropagation()
    var files = e.dataTransfer.files || e.target.files
    console.log(files)
    // var mimeType= files[0].type;
    // var imageUrl = e.dataTransfer.getData('text/html')

    console.log(e.dataTransfer.files[0].path)
  }, [])
  // useEffect(() => {
  //   setDragging((value) => true)
  // },[])

  return (
    <Wrapper
      onDrop={(e) => handleDrop(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragOver={(e) => handleDragOver(e)}
    >
      <Container>
        <Overlay dragActive={dragging}>
          <div>
            {' '}
            <p>DROP LINK OR TEXT FILE</p>
          </div>
        </Overlay>
        <Body>
          <Links />
        </Body>
      </Container>
    </Wrapper>
  )
})

const Overlay = styled.div`
  height: ${({ dragActive }) => (dragActive ? '100vh' : 0)};
  width: ${({ dragActive }) => (dragActive ? '100vw' : 0)};
  margin-right: auto;
  margin-left: auto;
  display: flex;
  transition: 0.2s ease;
  background-color: ${({ theme }) => theme.glassBg};
  /* background-color: rgba(255, 255, 255, 0.15); */
  backdrop-filter: blur(5px);
  position: absolute;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 99;
  & > div {
    display: ${({ dragActive }) => (dragActive ? 'block' : 'none')};
    color: #333;
    height: 80%;
    width: 80%;
    margin: 0 auto;
    border: black dashed;
    display: flex;
    justify-content: center;
    align-items: center;
    & > p {
      display: ${({ dragActive }) => (dragActive ? 'block' : 'none')};
      text-align: center;
    }
  }
`
const InnerOverlay = styled.div``

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin-right: auto;
  margin-left: auto;
  display: flex;
`
const Container = styled.div`
  background-color: ${({ theme }) => theme.container};
  display: flex;
  align-items: flex-start;
  width: 100% !important;
  height: 100%;
  flex-direction: column;
  transition: 0.2s;
`
const Body = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 16px;
  background-color: #f44336;
`

export default Twitter
