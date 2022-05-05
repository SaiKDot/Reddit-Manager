import React from 'react'
import styled from 'styled-components'
// import { log } from 'util'
import FileOpen from '../../Images/contextmenu/opened_folder_16px.svg'
import FolderOpen from '../../Images/contextmenu/file_explorer_16px.svg'
import RenameFile from '../../Images/contextmenu/rename_16px.svg'
import CopyUrl from '../../Images/contextmenu/link_16px.svg'
import Trash from '../../Images/contextmenu/waste_16px.svg'
import RemoveList from '../../Images/contextmenu/remove_list_16px.svg'
import Redownload from '../../Images/contextmenu/redownload_16px.svg'
import Avatar from '@mui/material/Avatar'



const ContextMenu = (props) => {
  const { posx , display } = props
  
  return (
    <Tippy x={posx.xPosx} y={posx.yPosx}>
      <CtxMenuRoot>
        <CtList>
          <CtMenuItem>
            <Menubtn>
              <FileOpen />
              <span>Open</span>
            </Menubtn>
          </CtMenuItem>

          <CtMenuItem>
            <Menubtn>
              <FolderOpen />
              <span>Open Folder</span>
            </Menubtn>
          </CtMenuItem>

          <CtMenuItem>
            <Menubtn>
              <RenameFile />
              <span>Rename</span>
            </Menubtn>
          </CtMenuItem>
          <MenuSeprator />
          <CtMenuItem>
            <Menubtn>
              <Redownload />
              <span>Redownload</span>
            </Menubtn>
          </CtMenuItem>
          <CtMenuItem>
            <Menubtn>
              <CopyUrl />
              <span>Copy URL</span>
            </Menubtn>
          </CtMenuItem>
          <CtMenuItem>
            <Menubtn>
              <RemoveList />
              <span>Remove From List</span>
            </Menubtn>
          </CtMenuItem>
          <CtMenuItem>
            <Menubtn>
              <Trash />
              <span>Delete</span>
            </Menubtn>
          </CtMenuItem>
          <MenuSeprator />
        </CtList>
      </CtxMenuRoot>
    </Tippy>
  )
}
const Tippy = styled.div`
  position: fixed;
  top: 0px;
  right: auto;
  bottom: auto;
  left: 0px;
  margin: 0px;
  transform: translate(${(props) => props.x}px, ${(props) => props.y}px);
  z-index: 99999;
`
const CtxMenuRoot = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
`
const CtList = styled.ul`
  min-width: 200px;
  max-width: 200px;
  height: 250px;
  padding: 2px;
  background-color: #FFF;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.3), 0 6px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow-y: hidden;
  margin: 12px;
  max-height: calc(100vh - 24px);
`
const CtMenuItem = styled.li`
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  cursor: pointer;
`

const Menubtn = styled.a`
  padding: 2px;
  position: relative;
  height: 32px;
  display: flex;
  gap: 8px;
  align-items: center;
  /* color: hsla(0, 0%, 100%, 0.9); */
  color: #3a3c42;
  text-align: start;
  text-decoration: none;
  background: transparent;
  background-color: transparent;
  border: 0;
  border-radius: 2px;
  &:hover {
    /* color: #fff; */
    color: #3a3c42;
    background-color: #d6d6d6;
  }
  & span:nth-child(2) {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: normal;
    text-transform: none;
  }
`
const MenuSeprator = styled.li`
  display: block;
  margin: 7px 5px;
  height: 1px;
  border-bottom: 1px solid #fff;
  background-color: #333;
  z-index: 99999;
`
const Av = styled(Avatar)`
  width: 30px;
  height: 30px;
  @media (max-width: 700px) : {
    width: 20px;
    height: 20px;
  }
`
export default ContextMenu
