import React, { useState, useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import _ from 'underscore'
import $ from 'jquery'
import { List as VList, AutoSizer } from 'react-virtualized' 
import { isValidURL } from '@shared/utils'
import {getBulkInput} from '../../../Actions'
import Dropper from './Dropper'
import ListRow from './ListRow'
import ContextMenu from '../../ContextMenu'
import { useSimpleAndDoubleClick } from '../../../Hooks'
import {memorySizeOf} from '@shared/utils'
// import vlcIcon from '../../../Images/zip.png'





 
import {
  changeHeaderDeleteIcon,
  setSelected,
  setDownloadList,
} from '../../../Actions'
import listArr from '../../../list.json'
import { useHistory } from 'react-router-dom'

 const areEqual = (prevProps, nextProps) => true

 



 const ListBody = React.memo((props) => {
   //   const download_list = useSelector((state) => state.app.download_list)
   
  const [dragging, setDragging] = useState(false)
  const [selectedRows, setSelected] = useState([])
  const [previousRow, setPrevRow] = useState(null)
  const [context_menu_display, setCmenu] = useState(false)
  const [posx, setPosx] = useState({
    xPosx: 0,
    yPosx: 0
  })
  const rowRefs = React.useRef([])
  const counter = useRef()
  const arrLength = listArr.length
  const dispatch = useDispatch()
  const dropRef = useRef()
  //const listRef = useRef()

  const prevRowRef = useRef(null)
   useEffect(() => {
     rowRefs.current = Array(arrLength)
       .fill()
       .map((_, i) => rowRefs.current[i] || React.createRef())
     
   }, [listArr])

   const contextMenuHandle =  useCallback((e, i) =>{
     setSelected((prev) =>  [i])
     e.stopPropagation()
     e.preventDefault()
     let x = e.pageX
     let y = e.pageY

     if (x + 200 > window.innerWidth) {
       x = x - 200
     }
     if (y + 300 > window.innerHeight) {
       y = y - 300
     }
     setCmenu(true)

     setPosx((prevState) => ({
       ...prevState,
       xPosx: x,
       yPosx: y,
     }))
   })
   useEffect(() => {
     const div = dropRef.current
     counter.current = 0
     div.addEventListener('dragenter', handleDragIn)
     div.addEventListener('dragleave', handleDragOut)
     div.addEventListener('dragover', handleDragOver)
     div.addEventListener('drop', handleDrop)
 

     return () => {
       div.removeEventListener('dragenter', handleDragIn)
       div.removeEventListener('dragleave', handleDragOut)
       div.removeEventListener('dragover', handleDragOver)
       div.removeEventListener('drop', handleDrop)
     }
   }, [])


   const handleDragOver = useCallback((e) =>{
      e.preventDefault()
      e.stopPropagation()
      return false
   },[])
   const handleDragIn = useCallback((e) =>{
      counter.current++
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setDragging(true)
        setCmenu(false)
      }
     e.preventDefault()
     e.stopPropagation()
     return false 
    
   },[counter])

   const handleDragOut =  useCallback((e) =>{
      e.preventDefault()
      e.stopPropagation()
      counter.current--
      if(counter.current > 0){
        return false
      }
      setDragging(false)
      return false 
   },[counter])

   const handleDrop = useCallback((e) => {
      e.preventDefault()
      e.stopPropagation()
       
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        let files = e.dataTransfer.files
        console.log(files[0])
        if(files[0].type == 'text/plain') {
          var reader = new FileReader() 
           reader.onload = function () {
             var text = reader.result  
              let array = text.toString().split('\r\n') 
             dispatch(getBulkInput(array, props.history))
              

             
            //  let array = text.toString().split("\r\n"); 
            //  let temp = []
            //  for (let i of array) i && temp.push(i) 
            //  array = temp
            //  console.log(memorySizeOf(array))
           }
        }
        reader.readAsText(files[0])
        e.dataTransfer.clearData()
        counter.current = 0
        setDragging(false)
      }
      if (e.dataTransfer.getData('text')) {
          if(isValidURL(e.dataTransfer.getData('text'))){
             let text = e.dataTransfer.getData('text')
             let array = text.toString().split('\n') 
            
              dispatch(getBulkInput(array, props.history))
          }
         counter.current = 0
         setDragging(false)
      }
      return false
   }, [counter])

   const handleRowClick = useCallback((e, id) => {
       dispatch(changeHeaderDeleteIcon(false))
       setCmenu(false)
        setPosx((prevState) => ({
          ...prevState,
          xPosx: 0,
          yPosx: 0,
        }))

       if (e.metaKey || e.ctrlKey) {
         if (selectedRows.includes(id)) {
           const arr = selectedRows.filter((item) => item !== id)        
           setSelected((prev) => [...arr])
             prevRowRef.current = null
         }
         else {
           setSelected((prev) => [...prev, id])
           prevRowRef.current = id
           console.log('sd', prevRowRef.current)
         }

         
       } else if (e.shiftKey) {
         if (prevRowRef == null) {
           prevRowRef.current = id
           setSelected((prev) => [...id])
         }
         if (prevRowRef.current < id) {
            let arr = []           
           for (let i = prevRowRef.current; i <= id; i++) {            
             arr.push(i)            
             setSelected((prev) => [...arr])
              if (i == previousRow) prevRowRef.current = i
           }
         } else if (prevRowRef.current > id) {
           let arr = []
           for (let i = id; i <= prevRowRef.current; i++) {
            arr.push(i) 
            setSelected((prev) => [...arr])
            if(i == previousRow)  prevRowRef.current = i
           }
         }
       } else {
         setSelected((prev) => [id])
         prevRowRef.current = id
         console.log('or')
       }
     },
     [selectedRows]
   )

  
   const getView = () => {
      // let dragging = false
      return (
        <div style={{ width: '100%', height: '100%' }}>
          {dragging == true ? <Dropper /> : ''}

          {context_menu_display == true ? <ContextMenu posx={posx} /> : ''}
          <AutoSizer>
            {({ width, height }) => (
              <VList
                width={width}
                height={height}
                rowHeight={40}
                rowCount={listArr.length}
                rowRenderer={({ key, index, style, parent }) => {
                  const item = listArr[index]

                  return (
                    <ListRow
                      onClick={(e) => handleRowClick(e, index)}
                      onContextMenu={(e) => contextMenuHandle(e, index)}
                      key={key}
                      item={item}
                      style={style}
                      index={index}
                      isSelected={selectedRows.includes(index)}
                    />
                  )
                }}
              />
            )}
          </AutoSizer>
        </div>
      )
   }

   return (
     <Body ref={dropRef} >
       <div style={{ width: '100%', height: '100%' }}>
         { getView()}
       </div>
     </Body>
   )
 })
const Body = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: calc(100% - 20px);
  width: 100%;
`

export default withRouter(ListBody)
