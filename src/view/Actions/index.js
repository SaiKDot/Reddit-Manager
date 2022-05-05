import * as consts from './types'

export const changeHeaderWidth = (id, neWidth) => {
  console.log(id)
    switch(id) {
      case 'name' : {         
           return { type: consts.CHANGE_HEADER_WIDTH, column:'name', payload: { id, neWidth } }         
      }
      break;
      case 'status' : {         
           return { type: consts.CHANGE_HEADER_WIDTH, column:'status', payload: { id, neWidth } }         
      }
      break;
      case 'size' : {         
           return { type: consts.CHANGE_HEADER_WIDTH, column:'size', payload: { id, neWidth } }         
      }
      break;
      case 'progress' : {         
           return { type: consts.CHANGE_HEADER_WIDTH, column:'progress', payload: { id, neWidth } }         
      }
      break;
      case 'lasttry' : {         
           return { type: consts.CHANGE_HEADER_WIDTH, column:'lasttry', payload: { id, neWidth } }         
      }
      break;
      case 'eta' : {         
           return { type: consts.CHANGE_HEADER_WIDTH, column:'eta', payload: { id, neWidth } }         
      }
      break;
      default:
         return { type: consts.CHANGE_HEADER_WIDTH, column:'name', payload: { id, neWidth } }
    }
  
}

export const setConMenu = (menuPostionX, menuPostionY) => {
  let x = menuPostionX
  let y = menuPostionY

  if (x + 200 > window.innerWidth) {
    x = x - 200
  }
  if (y + 300 > window.innerHeight) {
    y = y - 300
  }

  return { type: consts.SHOW_CONTEXT_MENU, payload: { x, y } }
}
export const changePanelWidth = (width) => {
  return{type:consts.CHANGE_SIDE_PANEL_WIDTH, payload: width}
}

export const changeHeaderDeleteIcon = (id, status) => {
  return {type:consts.CHNAGE_DELETE_BUTTON_STATUS, payload:{id: 'delete' , status: status}}
}

export const toggleSidePanel = () => {
  return { type: consts.HIDE_SIDEPANEL }
}

export const unSelectAll = () => {
  return { type: consts.UNSELECT_ALL_ITEM }
}
// export const setSelected = (id) => {
//   return { type: consts.SELECT_ITEM , payload: id}
// }

export const sortColumn = (id) => {
  return {type: consts.SORT_COLUMN, payload: id}
}

export const setDownloadList = (list) => {
  return { type: consts.STORE_DOWNLOAD_LIST , payload: list}
}


export const toggleTaskModal = () => {  
  return { type: consts.TOGGLE_TASK_MODAL }
}

export const newNameInput = (input) => {
    return dispatch => {
       
      console.log(input)

    }
    
    
}
export const clearAdvancedInputs = () => {
    return { type: consts.CLEAR_ADVANCED_INPUT }
}

export const refererChange = (input) => {

    return { type: consts.DOWNLOAD_REFERER_INPUT, payload: input }
}

export const cookieChange = (input) => {
    
    return { type: consts.DOWNLOAD_COOKIE_INPUT, payload: input}
}
export const proxyChange = (input) => {
    return { type: consts.DOWNLOAD_PROXY_INPUT, payload: input }
}

export const cancelTask = (input) => {
    return { type: consts.DOWNLOAD_TASK_CANCEL }
}

 

export const dirInput = input => {
    return {type:consts.DOWNLOAD_DIR_INPUT, payload:input};
}
export const getDirectory = () => {
  return (dispatch) => {
    // dialog.showOpenDialog(require('electron').remote.getCurrentWindow(), {
    //     properties: ['openDirectory', 'createDirectory']
    // }).then(({ canceled, filePaths }) => {
    //     const [path] = filePaths
    //     dispatch({ type: consts.DOWNLOAD_FOLDER_SELECT, payload: path})
    // })
    console.log('dispatche')
  }
}
export const changeDirectory = (val) => {
    return { type: consts.CHANGE_DEFAULT_DIRECTORY, payload: val }
}

export const getBulkInput = (data, history) => {
  return (dispatch) => {
      // let array = data.toString().split('\r\n')
      // console.log(array);
      dispatch ({ type: consts.GET_BULK_LINKS, payload: data })
      history.push('/batch')

  }

    
}