import * as consts from './types'
import  sizeof from  'object-sizeof'
// import { ipcMain } from 'electron/main'
import { ipcRenderer } from 'electron'

 
export const getSavedPosts = async(message) => {   
   const links = await ipcRenderer.invoke('renderer:getSavedPosts')  
   console.log(links)
  return  (state, dispatch) => {   
    dispatch({ type: consts.SET_SAVED_POSTS, payload: links })
  }
 
}


export const setSavedPosts = (links) => {  
  return { type: consts.SET_SAVED_POSTS, payload: links }
}


export const sortCardsBy = (input)=> {
   
  const sort =
    input == 'alpha' ? consts.SORT_CARDS_ALPHA : consts.SORT_CARDS_RANK
    return {type: sort}
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