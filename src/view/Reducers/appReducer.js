import * as consts from '../actions/types'
import {groupBy} from '@shared/utils'
 const initial_state = {
   saved_posts: {},
 }


 export default (state = initial_state, actions ) => {
    switch (actions.type) {
      case consts.SET_SAVED_POSTS:      
       return {
         ...state,
         saved_posts: actions.payload
       }        
       break;
      case consts.DOWNLOAD_TASK_CANCEL: return {
        ...state, download_list: []
      }
      break
      default: return state;
        
    }
 }