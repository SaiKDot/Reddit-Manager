import * as consts from '../Actions/types'


 const initial_state = {
   download_list : []
 }


 export default (state = initial_state, actions ) => {
    switch (actions) {
      case consts.STORE_DOWNLOAD_LIST: return {
        ...state, download_list: [...state.download_list,actions.payload]
      }        
        break;
      case consts.DOWNLOAD_TASK_CANCEL: return {
        ...state, download_list: []
      }
      break
      default: return state;
        
    }
 }