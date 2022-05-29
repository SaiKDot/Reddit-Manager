import { EventEmitter } from 'events'
import { app } from 'electron'
import is from 'electron-is'

import ExceptionHandler from './Helpers/ExceptionHandler'
import logger from './Helpers/Logger'
import MainProcess from './MainProcess'
import { splitArgv, parseArgvAsUrl, parseArgvAsFile } from './utils'
import { EMPTY_STRING } from '@shared/constants'

export default class Launcher extends EventEmitter {
  constructor() {
    super()
    this.url = EMPTY_STRING
    this.file = EMPTY_STRING

    this.makeSingleInstance(() => {
      this.init()
    })
  }

  makeSingleInstance(callback) {
    // Mac App Store Sandboxed App not support requestSingleInstanceLock
    if (is.mas()) {
      callback && callback()
      return
    }

    const gotSingleLock = app.requestSingleInstanceLock()

    if (!gotSingleLock) {
      app.quit()
    } else {
      app.on('second-instance', (event, argv, workingDirectory) => {
        global.application.showPage('index')
        if (!is.macOS() && argv.length > 1) {
          this.handleAppLaunchArgv(argv)
        }
      })

      callback && callback()
    }
  }

  init() {
    this.exceptionHandler = new ExceptionHandler()
    this.handleAppEvents()
  }

  handleAppEvents() {
    // this.handleOpenFile()
    this.handelAppReady()
    this.handleAppWillQuit()
  }

  /**
   * handleOpenFile
   * Event 'open-file' macOS only
   * handle open torrent file
   */
  // handleOpenFile() {
  //   if (!is.macOS()) {
  //     return
  //   }
  //   app.on('open-file', (event, path) => {
  //     logger.info(`App open-file: ${path}`)
  //     event.preventDefault()
  //     this.file = path
  //     this.sendFileToApplication()
  //   })
  // }

  /**
   * handleAppLaunchArgv
   * For Windows, Linux
   * @param {array} argv
   */
  handleAppLaunchArgv(argv) {
    logger.info('App handleAppLaunchArgv:', argv)

    // args: array, extra: map
    const { args, extra } = splitArgv(argv)
    logger.info('App split argv args:', args)
    logger.info('App split argv extra:', extra)

    const file = parseArgvAsFile(args)
    if (file) {
      this.file = file
      this.sendFileToApplication()
    }
  }

  sendUrlToApplication() {
    if (this.url && global.application && global.application.isReady) {
      global.application.handleProtocol(this.url)
      this.url = EMPTY_STRING
    }
  }

  sendFileToApplication() {
    if (this.file && global.application && global.application.isReady) {
      global.application.handleFile(this.file)
      this.file = EMPTY_STRING
    }
  }
  handelAppReady() {
    app.on('ready', () => {
      global.application = new MainProcess()

      const { openedAtLogin } = this
      global.application.start('index', {
        openedAtLogin,
      })

      global.application.on('ready', () => {
        this.sendUrlToApplication()

        this.sendFileToApplication()
      })
    })

    app.on('activate', () => {
      if (global.application) {
        logger.info('App activate')
        global.application.showPage('index')
      }
    })
  }

  handleAppWillQuit() {
    app.on('will-quit', () => {      
      if (global.application) {
        global.application.stop()
      }
    })
  }
}
