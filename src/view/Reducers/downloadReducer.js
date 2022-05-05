import * as consts from '../Actions/types'

const initial_state = {
  download_list: []
}
export default (state = initial_state, actions) => {
  switch (actions.type) {

    case consts.GET_BULK_LINKS: return { ...state, download_list: actions.payload }
    break
    default: return state
    break
  }
  
}

