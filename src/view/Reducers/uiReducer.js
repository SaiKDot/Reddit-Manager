import * as consts from '../Actions/types'
 const initial_state = {
   context_menu_display: false,
   cm_xPos: 0,
   cm_yPos: 0,
   dummy: false,
   defaultSidePanelWidth: 75,
   selectedItems: [],
   sidePanel_width: 75,
   showTaskModal: false,
   columnSort: { column: 'name', sortBy: 'ASC' },
   headerButtons: [
     {
       id: 'add',
       image: 'Add',
       image_disabled: '',
       text: 'Add URL',
       disabled: false,
     },
     {
       id: 'resume',
       image: 'Resume',
       image_disabled: 'Resume_D',
       text: 'Resume',
       disabled: true,
     },
     {
       id: 'stop',
       image: 'Stop',
       image_disabled: 'Stop_D',
       text: 'Stop',
       disabled: true,
     },
     {
       id: 'cancel',
       image: 'Cancel',
       image_disabled: 'Cancel_D',
       text: 'Stop All',
       disabled: true,
     },
     {
       id: 'delete',
       image: 'Delete',
       image_disabled: 'Delete_D',
       text: 'Delete',
       disabled: true,
     },
     {
       id: 'deleteAll',
       image: 'DeleteAll',
       image_disabled: 'DeleteAll_D',
       text: 'Delete All',
       disabled: false,
     },
   ],
   header_: [
     {
       id: 'name',
       name: 'Name',
       width: 200,
       order: 1,
     },
     {
       id: 'size',
       name: 'Size',
       width: 70,
       order: 2,
     },
     {
       id: 'status',
       name: 'Status',
       width: 150,
       order: 3,
     },
     {
       id: 'progress',
       name: 'Progress',
       width: 500,
       order: 4,
     },
     {
       id: 'lasttry',
       name: 'Last Try At',
       width: 200,
       order: 5,
     },
     {
       id: 'eta',
       name: 'Time Left',
       width: 100,
       order: 6,
     },
   ],
    nameWidth:200,
    sizeWidth:70,
    statusWidth:150,
    progressWidth:500,
    lastTryWidth:200,
    etaWidth:50,
 }


export default (state = initial_state, actions) => {
  switch (actions.type) {
     case consts.CHANGE_HEADER_WIDTH :  {
       switch(actions.column) {
         case 'name' : {
           return { ...state, nameWidth: actions.payload.neWidth }
         }
         break
         case 'size' : {
            return { ...state, sizeWidth: actions.payload.neWidth }
         }
         break
         case 'status' : {
            return { ...state, statusWidth: actions.payload.neWidth }
         }
         break
         case 'progress' : {
            return { ...state, progressWidth: actions.payload.neWidth }
         }
         break
         case 'lasttry' : {
            return { ...state, lastTryWidth: actions.payload.neWidth }
         }
         break
         case 'eta' : {
            return { ...state, etaWidth: actions.payload.neWidth }
         }
         break
       }
      
    }
       
     break;
    case consts.CHANGE_SIDE_PANEL_WIDTH : return {
      ...state, sidePanel_width : actions.payload
    }
    break
    case consts.CHNAGE_DELETE_BUTTON_STATUS : {
       
      const index  = state.headerButtons.findIndex(item => item.id  == 'delete');
      const newArray = [...state.headerButtons]
       if(newArray[index].disabled == true) {
            newArray[index].disabled = false
            return {
              ...state, //copying the orignal state
              headerButtons: newArray, //reassingning todos to new array
            }
       }
       else {
         return state
       }
       
      
      
    }
    break
    case consts.HIDE_SIDEPANEL : {
       return { ...state, sidePanel_width: 0 }
    }
    break;
    case consts.SELECT_ITEM : {
      return { ...state, selectedItem : actions.payload}
    }
    break
    case consts.UNSELECT_ALL_ITEM: {
      return {...state , selectedItem: null}
    }
    break
    case consts.TOGGLE_TASK_MODAL: return { ...state, showTaskModal: !state.showTaskModal, context_menu_display: false}
    break
    default: return state;
  }
}
