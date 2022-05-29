import * as consts from '../actions/types'
import {groupBy} from '@shared/utils'
 const initial_state = {
   saved_posts: {},
   init_posts: {}
 }

//  function groupAndCollectBySameKeyValue({ key, result }, item) {
//   const groupValue = item[key];
//   (result[groupValue] ??= []).push(item)
//   return { key, result };
// }

// function reduceAndSort(array,param) {   
//   const reducedArr = array.reduce(groupAndCollectBySameKeyValue, {
//     key: 'subreddit',
//     result: {},
//   }).result
// const mappedObj = Object.entries(reducedArr)
//   .map(([key, value]) => ({ [key]: value }))
//   .sort((a, b) =>
//     // ... either by array length ....
//     param == 'rank'
//       ? Object.values(b)[0].length - Object.values(a)[0].length
//       : // ... or by locale alphanumeric precedence.
//         Object.keys(a)[0].localeCompare(Object.keys(b)[0]) ||
//         Object.values(b)[0].length - Object.values(a)[0].length
//   )
// return mappedObj;
// }
 export default (state = initial_state, actions ) => {    
    switch (actions.type) {
     
      case consts.SET_SAVED_POSTS:
        return {
          ...state,
          saved_posts: actions.payload,
          init_posts: actions.payload,
        }
        break
      case consts.DOWNLOAD_TASK_CANCEL:
        return {
          ...state,
          download_list: [],
        }
        break
      case consts.SORT_CARDS_RANK:
        return {
          ...state,
          saved_posts: reduceAndSort(state.init_posts, 'rank'),
        }
        break
      case consts.SORT_CARDS_ALPHA:
        return {
          ...state,
          saved_posts: reduceAndSort(state.init_posts, 'alpha'),
        }
        break
      default:
        return state
    }
 }
