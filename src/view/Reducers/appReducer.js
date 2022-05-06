import * as consts from '../actions/types'
import {groupBy} from '@shared/utils'
 const initial_state = {
   saved_list_import : {}
 }


 export default (state = initial_state, actions ) => {
    switch (actions.type) {
      case consts.SET_SAVED_LINKS_FROM_FILE:      
       return {
         ...state,
         saved_list_import: groupBy(actions.payload, 'subreddit'),
       }        
       break;
      case consts.DOWNLOAD_TASK_CANCEL: return {
        ...state, download_list: []
      }
      break
      default: return state;
        
    }
 }