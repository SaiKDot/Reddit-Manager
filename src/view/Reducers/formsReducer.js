import * as consts from '../Actions/types'
const initial_state = {
  new_filename_error: false,
  downloadTask: {
    name: null,
    nameMask:null,
    url: [],
    name: '',
    directory: '',
    referer: '',
    cookie: '',
    proxy: '',
    dummy2: false,
  },
}

export default (state = initial_state, actions) => {
  switch (actions.type) {

    case consts.DOWNLOAD_TASK_CANCEL: return { ...state, downloadTask: initial_state.downloadTask }
      break
    case consts.CHANGE_NAME_INPUT: return { ...state, downloadTask: { ...state.downloadTask, name: actions.payload }}
      break
    case consts.NEW_FILE_NAME_ERROR:
      return { ...state, new_filename_error: true }
      break
    case consts.DOWNLOAD_DIR_INPUT: return {  ...state, downloadTask: { ...state.downloadTask, directory: actions.payload } }
      break
    case consts.CHANGE_DEFAULT_DIRECTORY: return { ...state, defaultDirectory: actions.payload}
      break
    case consts.DOWNLOAD_FOLDER_SELECT: return { ...state, downloadTask: { ...state.downloadTask, directory: actions.payload } }
      break
    case consts.DOWNLOAD_REFERER_INPUT: return { ...state, downloadTask: { ...state.downloadTask, referer: actions.payload }}
      break
    case consts.DOWNLOAD_COOKIE_INPUT: return { ...state, downloadTask: { ...state.downloadTask, cookie: actions.payload } }
      break
    case consts.DOWNLOAD_PROXY_INPUT: return { ...state, downloadTask: { ...state.downloadTask, proxy: actions.payload } }
      break
    case consts.CLEAR_ADVANCED_INPUT: return { ...state,
        downloadTask: {
          ...state.downloadTask,
          referer: '',
          cookie: '',
          proxy: '',
        },
    }
      break
 
    default:
      return state
  }
}
