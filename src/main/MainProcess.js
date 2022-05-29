import { EventEmitter } from 'events'
import { app, shell, dialog, ipcMain } from 'electron'
import is from 'electron-is'
import { readFile, unlink } from 'fs'
import { extname, basename } from 'path'
import { isEmpty } from 'lodash'
import fs from 'fs'
import csv from 'csv-parser'
import Store from 'electron-store'
import {
  APP_RUN_MODE, 
  AUTO_CHECK_UPDATE_INTERVAL,
} from '@shared/constants'
import logger from './Helpers/Logger' 
import ConfigManager from './Controllers/ConfigManager'
import Engine from './Controllers/Engine'
import EngineClient from './Controllers/EngineClient'
import WindowManager from './Window/WindowManager'
import MenuManager from './Window/MenuManager'
import LinksManager from './Controllers/LinksManager'
import { getSessionPath } from './utils'
import 'dotenv/config'

export default class MainProcess extends EventEmitter {
  constructor() {
    super()
    this.isReady = false
    this.init()
  }

  init() {
    this.configManager = this.initConfigManager()

    this.setupApplicationMenu()

    this.initWindowManager()

    this.startEngine()

    this.initEngineClient()

    this.handleCommands()

    this.handleEvents()

    this.handleIpcMessages()

    this.handleIpcInvokes()   

    this.emit('application:initialized')

    this.saveFiles = new Store({})

    this.linksManager = this.initLinksManager()

   
  }

  initConfigManager() {
    this.configListeners = {}
    return new ConfigManager()
  }

  offConfigListeners() {
    try {
      Object.keys(this.configListeners).forEach((key) => {
        this.configListeners[key]()
      })
    } catch (e) {
      logger.warn('App offConfigListeners===>', e)
    }
    this.configListeners = {}
  }

  setupApplicationMenu() {
    this.menuManager = new MenuManager()
    this.menuManager.setup(this.locale)
  }

  adjustMenu() {
    if (is.mas()) {
      const visibleStates = {
        'app.check-for-updates': false,
      }
      this.menuManager.updateMenuStates(visibleStates, null, null)
    }
  }

  startEngine() {
    const self = this

    try {
      this.engine = new Engine({
        systemConfig: this.configManager.getSystemConfig(),
        userConfig: this.configManager.getUserConfig(),
      })
      this.engine.start()
    } catch (err) {
      const { message } = err
      dialog
        .showMessageBox({
          type: 'error',
          title: 'System Error',
          message: `Application startup failed ${message}`,
        })
        .then((_) => {
          setTimeout(() => {
            self.quit()
          }, 100)
        })
    }
  }

  async stopEngine() {
    try {
      await this.engineClient.shutdown({ force: true })
      setImmediate(() => {
        this.engine.stop()
      })
    } catch (err) {
      logger.warn('App shutdown engine fail: ', err.message)
    } finally {
      // no finally
    }
  }

  initEngineClient() {
    const port = this.configManager.getSystemConfig('rpc-listen-port')
    const secret = this.configManager.getSystemConfig('rpc-secret')
    this.engineClient = new EngineClient({
      port,
      secret,
    })
  }

  autoResumeTask() {
    const enabled = this.configManager.getUserConfig(
      'resume-all-when-app-launched'
    )
    if (!enabled) {
      return
    }

    this.engineClient.call('unpauseAll')
  }

  initWindowManager() {
    this.windowManager = new WindowManager({
      userConfig: this.configManager.getUserConfig(),
    })

    this.windowManager.on('window-resized', (data) => {
      this.storeWindowState(data)
    })

    this.windowManager.on('window-moved', (data) => {
      this.storeWindowState(data)
    })

    this.windowManager.on('window-closed', (data) => {
      logger.info('window-closed')
      this.storeWindowState(data)
      this.handleWindowClosed(data)
    })

    this.windowManager.on('enter-full-screen', (window) => {
      this.dockManager.show()
    })

    this.windowManager.on('leave-full-screen', (window) => {
      const mode = this.configManager.getUserConfig('run-mode')
      if (mode !== APP_RUN_MODE.STANDARD) {
        this.dockManager.hide()
      }
    })
  }

  storeWindowState(data = {}) {
    const enabled = this.configManager.getUserConfig('keep-window-state')
    if (!enabled) {
      return
    }

    const state = this.configManager.getUserConfig('window-state', {})
    const { page, bounds } = data
    const newState = {
      ...state,
      [page]: bounds,
    }
    this.configManager.setUserConfig('window-state', newState)
  }

  start(page, options = {}) {
    const win = this.showPage(page, options)

    win.once('ready-to-show', () => {
      this.isReady = true
      this.emit('ready')
    })
    if (is.macOS()) {
      this.touchBarManager.setup(page, win)
    }
  }

  showPage(page, options = {}) {
    const { openedAtLogin } = options
    const autoHideWindow = this.configManager.getUserConfig('auto-hide-window')
    return this.windowManager.openWindow(page, {
      hidden: openedAtLogin || autoHideWindow,
    })
  }

  show(page = 'index') {
    this.windowManager.showWindow(page)
  }

  hide(page) {
    if (page) {
      this.windowManager.hideWindow(page)
    } else {
      this.windowManager.hideAllWindow()
    }
  }

  toggle(page = 'index') {
    this.windowManager.toggleWindow(page)
  }

  closePage(page) {
    this.windowManager.destroyWindow(page)
  }

  async stop() {
    try {
      await this.stopEngine()
    } catch (err) {
      logger.warn('App stop error: ', err.message)
    }
  }

  async quit() {
    await this.stop()
    app.exit()
  }

  sendCommand(command, ...args) {
    if (!this.emit(command, ...args)) {
      const window = this.windowManager.getFocusedWindow()
      if (window) {
        this.windowManager.sendCommandTo(window, command, ...args)
      }
    }
  }

  sendCommandToAll(command, ...args) {
    if (!this.emit(command, ...args)) {
      this.windowManager.getWindowList().forEach((window) => {
        this.windowManager.sendCommandTo(window, command, ...args)
      })
    }
  }

  sendMessageToAll(channel, ...args) {
    this.windowManager.getWindowList().forEach((window) => {
      this.windowManager.sendMessageTo(window, channel, ...args)
    })
  }

  // initThemeManager() {
  //   this.themeManager = new ThemeManager()
  //   this.themeManager.on('system-theme-change', (theme) => {
  //     this.trayManager.handleSystemThemeChange(theme)
  //     this.sendCommandToAll('application:update-system-theme', { theme })
  //   })
  // }

  initTouchBarManager() {
    if (!is.macOS()) {
      return
    }

    this.touchBarManager = new TouchBarManager()
  }

  async handleWindowClosed() {
    this.stop()
    app.exit()
  }

  async relaunch() {
    await this.stop()
    app.relaunch()
    app.exit()
  }

  async resetSession() {
    await this.stopEngine()

    app.clearRecentDocuments()

    const sessionPath =
      this.configManager.getUserConfig('session-path') || getSessionPath()
    setTimeout(() => {
      unlink(sessionPath, function (err) {
        logger.info('App Removed the download seesion file:', err)
      })

      this.engine.start()
    }, 3000)
  }

  savePreference(config = {}) {
    logger.info('App save preference:', config)
    const { system, user } = config
    if (!isEmpty(system)) {
      console.info('App main save system config: ', system)
      this.configManager.setSystemConfig(system)
      this.engineClient.changeGlobalOption(system)
    }

    if (!isEmpty(user)) {
      console.info('App main save user config: ', user)
      this.configManager.setUserConfig(user)
    }
  }

 initLinksManager() {
  return new LinksManager()
 }

  readCsv(path) {
    let savedData = []
    return new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csv())
        .on('data', function (data) {
          try {
            savedData.push(data)
          } catch (err) {
            console.log(err)
            reject(err)
          }
        })
        .on('end', function () {
          resolve(savedData)
        })
    })
  }

  async openPostsFile() {
    var open = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'CSV', extensions: ['csv'] }],
    })

    if (open.canceled === true || open.filePaths.length === 0) return

    const fileString = await this.readCsv(open.filePaths[0])
    const posts = fileString.map(({ permalink, id }) => {
      const subreddit = permalink.split('/')[4]
      const postId = id
      return { permalink, subreddit, postId }
    })
    // const groupedPosts = groupBy(posts, 'subreddit')
    
    this.saveFiles.set('savedPosts', posts)
     
    
    this.sendMessageToAll('main:recievedPosts', posts)
  }

  async retrieveSavedPosts() {
    console.log(this.saveFiles)
    const posts = this.saveFiles.get('savedPosts')
    this.sendMessageToAll('main:recievedPosts', posts)
  }

  async handleLinks() {    
    const linksManager = new LinksManager()
    const posts = linksManager.getPosts()    
    this.sendMessageToAll('main:recievedPosts', posts)  
  }

  handleCommands() {
    this.on('application:openPostsFile', this.openPostsFile)

    this.on('application:openSavedLinks', this.retrieveSavedPosts)

    this.on('application:save-preference', this.savePreference)

    this.on('application:relaunch', () => {
      this.relaunch()
    })

    this.on('application:quit', () => {
      this.quit()
    })

    this.on('application:show', ({ page }) => {
      this.show(page)
    })

    this.on('application:hide', ({ page }) => {
      this.hide(page)
    })

    this.on('application:reset-session', () => this.resetSession())

    this.on('application:reset', () => {
      this.offConfigListeners()
      this.configManager.reset()
      this.relaunch()
    })

    // this.on('application:change-theme', (theme) => {
    //   this.themeManager.updateSystemTheme(theme)
    //   this.sendCommandToAll('application:update-theme', { theme })
    // })

    this.on('application:toggle-dock', (visible) => {
      if (visible) {
        this.dockManager.show()
      } else {
        this.dockManager.hide()
        // Hiding the dock icon will trigger the entire app to hide.
        this.show()
      }
    })

    this.on('application:auto-hide-window', (hide) => {
      if (hide) {
        this.windowManager.handleWindowBlur()
      } else {
        this.windowManager.unbindWindowBlur()
      }
    })

    this.on('application:change-menu-states',(visibleStates, enabledStates, checkedStates) => {
        this.menuManager.updateMenuStates(
          visibleStates,
          enabledStates,
          checkedStates
        )
        this.trayManager.updateMenuStates(
          visibleStates,
          enabledStates,
          checkedStates
        )
      }
    )

    this.on('application:clear-recent-tasks', () => {
      app.clearRecentDocuments()
    })
   
  }

  openExternal(url) {
    if (!url) {
      return
    }

    shell.openExternal(url)
  }

  handleConfigChange(configName) {
    this.sendCommandToAll('application:update-preference-config', {
      configName,
    })
  }

  handleEvents() {
    this.once('application:initialized', () => {
      this.autoResumeTask()
       this.handleLinks()
      this.adjustMenu()

    })

    this.configManager.userConfig.onDidAnyChange(() =>
      this.handleConfigChange('user')
    )
    this.configManager.systemConfig.onDidAnyChange(() =>
      this.handleConfigChange('system')
    )

    this.on('speed-change', (speed) => {
      this.dockManager.handleSpeedChange(speed)
      this.trayManager.handleSpeedChange(speed)
    })

    this.on('task-download-complete', (task, path) => {
      this.dockManager.openDock(path)

      if (is.linux()) {
        return
      }
      app.addRecentDocument(path)
    })
  }

  handleIpcMessages() {
    ipcMain.on('command', (event, command, ...args) => {
      logger.log('App ipc receive command', command, ...args)
      this.emit(command, ...args)
    })

    ipcMain.on('event', (event, eventName, ...args) => {
      logger.log('App ipc receive event', eventName, ...args)
      this.emit(eventName, ...args)
    })    
    
  }

  handleIpcInvokes() {
    ipcMain.handle('get-app-config', async () => {
      const systemConfig = this.configManager.getSystemConfig()
      const userConfig = this.configManager.getUserConfig()
      const result = {
        ...systemConfig,
        ...userConfig,
      }
      return result
    })
     ipcMain.handle('renderer:getSavedPosts', async () => {
       return this.linksManager.getPosts()
     })
  }

 
}
