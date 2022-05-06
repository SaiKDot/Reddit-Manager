import React, { useState, useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import _ from 'underscore'
import $ from 'jquery'
import { List as VList, AutoSizer } from 'react-virtualized'
import ListRow from './ListRow'
 
import listArr from '../../../list.json'
import { useHistory } from 'react-router-dom'

 const areEqual = (prevProps, nextProps) => true

 



 const ListBody = React.memo((props) => {
 
  const [selectedRows, setSelected] = useState([]) 
 
  const dispatch = useDispatch()
  const dropRef = useRef()  
   const getView = () => {

      return (
        <div style={{ width: '100%', height: '100%' }}>
          

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
                      key={key}
                      item={item}
                      style={style}
                      index={index}
                      
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
