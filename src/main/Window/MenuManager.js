import { EventEmitter } from 'events'
import { Menu } from 'electron'

import {  
  flattenMenuItems,
  updateStates,
  convertTemplate
} from './utils/menu'
 import keymap from './utils/keymap.json'
import menu from './utils/menu.json'

export default class MenuManager extends EventEmitter {
  constructor(options) {
    super()
    this.options = options
    this.keymap = keymap
    this.items = {}

    this.load()

    this.setup()
  }

  load() {
    const template = menu
    this.template = template.menu
  }

  build() {
    const keystrokesByCommand = {}
    for (const item in keymap) {
      keystrokesByCommand[keymap[item]] = item
    }
    const template = JSON.parse(JSON.stringify(menu.menu))
    const tpl = convertTemplate(template, keystrokesByCommand)
    const men = Menu.buildFromTemplate(tpl)
    return men
  }
  setup() {
    const menu = this.build()
    Menu.setApplicationMenu(menu)
    this.items = flattenMenuItems(menu)
  }

 
  updateMenuStates(visibleStates, enabledStates, checkedStates) {
    updateStates(this.items, visibleStates, enabledStates, checkedStates)
  }

  updateMenuItemVisibleState(id, flag) {
    const visibleStates = {
      [id]: flag,
    }
    this.updateMenuStates(visibleStates, null, null)
  }

  updateMenuItemEnabledState(id, flag) {
    const enabledStates = {
      [id]: flag,
    }
    this.updateMenuStates(null, enabledStates, null)
  }
}
