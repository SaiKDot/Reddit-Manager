import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
 import _ from 'underscore'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import vlcIcon from '../../../Images/zip.png'
import styled from 'styled-components'
import ProgressBar from './ProgressBar'
import * as moment from 'moment'
import listArr from '../../../list.json'
import { changeHeaderIcon } from '../../../actions'



const ListRow = React.memo((props) => {
  const headerWidth = useSelector((state) => state.ui.headerWidth, _.isEqual)
  const dispatch = useDispatch()
    const [selectedRows, setSelected] = useState([])
  const { item, style, index, isSelected, ...rowProps } = props
  const rowRefs = React.useRef([])
  const prevRowRef = useRef(null)
 
  // useEffect(() => {
  //   rowRefs.current = Array(arrLength)
  //     .fill()
  //     .map((_, i) => rowRefs.current[i] || React.createRef())
    
  // }, [listArr])
 
 
  return (
    <Row
      style={style}
      // ref={rowRefs.current[index]}
      isSelected={isSelected}
      {...rowProps}
      
    >
      <RowContent>
        <NameColumn item={item} />
        <SizeRow item={item} />
        <StatusRow item={item} />
        <ProgressRow item={item} />
        <LastTryRow item={item} />
        <EtaRow item={item} />
      </RowContent>
    </Row>
  )
})


const NameColumn = props => {
 const nameWidth = useSelector((state) => state.ui.nameWidth)
  return (
    <Cell style={{ width: nameWidth }}>
      <AvItem>
        <Av src={vlcIcon} variant={'square'} />
      </AvItem>
      <ListText primary={props.item.name} />
    </Cell>
  )
}

const SizeRow = (props) => {
  const sizeWidth = useSelector((state) => state.ui.sizeWidth)
  return (
    <Cell style={{ width: sizeWidth }}>
      <span>5 GB</span>
    </Cell>
  )
}

const StatusRow = props => {
  const statusWidth = useSelector((state) => state.ui.statusWidth)
  return (
    <Cell style={{ width: statusWidth }}>
      <ListText primary={props.item.status} />
    </Cell>
  )
}
const ProgressRow = props => {
  const progressWidth = useSelector((state) => state.ui.progressWidth)
  return (
    <Cell style={{ width: progressWidth }}>
      <Progress>
        <ProgressBar />
        <span> 50% </span>
      </Progress>
    </Cell>
  )
}
const LastTryRow = props => {
   const lastTryWidth = useSelector((state) => state.ui.lastTryWidth)
  return (
    <Cell style={{ width: lastTryWidth }}>
      <ListText primary={moment(props.item.date).format('d-m-Y')} />
    </Cell>
  )
}
const EtaRow = (props) => {
  const etaWidth = useSelector((state) => state.ui.etaWidth)
  return (
    <Cell style={{ width: etaWidth }}>
      <ListText primary={'3 sec'} />
    </Cell>
  )
}
const Row = styled.div`
  --reveal-color1: rgba(0, 0, 0, 0.2);
  --reveal-color2: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;

  background-color: ${({ isSelected }) => (isSelected ? '#0078D7' : '#fff')};
  /* transition: all 0.1s cubic-bezier(0.5, 0, 0, 1); */
  /* &:nth-child(odd) {
    background-color: ${({ isSelected }) =>
    isSelected ? '#CCE8FF' : '#f5f5f5'};
  } */
  &:active,
  &:focus {
    background-color: #0078d7;
  }
  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? '#0078D7' : '#d6d6d6'};
  }
`
const RowContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  & > div {
    flex: 0 0 auto;
  }
  color: ${({ isSelected }) => (isSelected ? '#FFF' : '#343434')};
`
const Cell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  /* width: ${(props) => props.width}px; */
  padding: 4px 0 4px 0;
  pointer-events: none;
  user-select: none;
  > span {
    margin-left: 8px;
  }
`
const Item = styled(ListItem)`
  padding-left: 0px;
  padding-right: 0px;
  padding: 4px 0 4px 0;
  align-items: center;
`
const AvItem = styled(ListItemAvatar)`
  min-width: auto;
  margin-top: 0px;
`
const Av = styled(Avatar)`
  width: 30px;
  height: 30px;
  & > .MuiAvatar-img {
    pointer-events: none;
  }
`

const ListText = styled(ListItemText)`
  & .MuiListItemText-primary {
    /* display: inline-flex; */

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 8px;
    pointer-events: none;
  }
`
const Progress = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  pointer-events: none;
  & > span {
    font-size: 12px;
  }
`

export default ListRow
