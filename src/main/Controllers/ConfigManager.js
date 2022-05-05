// import { app } from 'electron'
import is from 'electron-is'
import Store from 'electron-store'

import {
  getLogPath,
  getSessionPath,
  getUserDownloadsPath,
  getMaxConnectionPerServer,
} from '../utils/index'
import {
  APP_RUN_MODE, 
  EMPTY_STRING, 
} from '@shared/constants'
import { separateConfig } from '@shared/utils'
import { reduceTrackerString } from '@shared/utils/tracker'

export default class ConfigManager {
  constructor() {
    this.systemConfig = {}
    this.userConfig = {}

    this.init()
  }

  init() {
    this.initSystemConfig()
    this.initUserConfig()
  }

  /**
   * Some aria2 conf
   * https://aria2.github.io/manual/en/html/aria2c.html
   *
 
   */
  initSystemConfig() {
    this.systemConfig = new Store({
      name: 'system',
      /* eslint-disable quote-props */
      defaults: {
        'all-proxy': EMPTY_STRING,
        'allow-overwrite': false,
        'auto-file-renaming': true,   
         continue: true,        
         dir: getUserDownloadsPath(),         
        'listen-port': 21301,
        'max-concurrent-downloads': 5,
        'max-connection-per-server': getMaxConnectionPerServer(),
        'max-download-limit': 0,
        'max-overall-download-limit': 0,
        'max-overall-upload-limit': '256K',
        'min-split-size': '1M',
        'no-proxy': EMPTY_STRING,
        pause: true,
        'pause-metadata': false,
        'rpc-listen-port': 16800,
        'rpc-secret': EMPTY_STRING,
        'seed-ratio': 1,
        'seed-time': 60,
        split: getMaxConnectionPerServer(),
        'user-agent': 'Transmission/2.94',
      },
      /* eslint-enable quote-props */
    })
    this.fixSystemConfig()
  }

  initUserConfig() {
    this.userConfig = new Store({
      name: 'user',
      // Schema need electron-store upgrade to 3.x.x,
      // but it will cause the application build to fail.
      // schema: {
      //   theme: {
      //     type: 'string',
      //     enum: ['auto', 'light', 'dark']
      //   }
      // },
      /* eslint-disable quote-props */
      defaults: {
        'all-proxy-backup': EMPTY_STRING,
        'auto-check-update': is.macOS(),
        'auto-hide-window': false,
        'auto-sync-tracker': true,
        'enable-upnp': true,
        'engine-max-connection-per-server': getMaxConnectionPerServer(),
        'hide-app-menu': is.windows() || is.linux(),       
        'keep-window-state': false,  
        'log-path': getLogPath(),
        'new-task-show-downloading': true,
        'no-confirm-before-delete-task': false,       
        'resume-all-when-app-launched': false,
        'run-mode': APP_RUN_MODE.STANDARD,
        'session-path': getSessionPath(),
        'task-notification': true, 
        'update-channel': 'latest',
        'use-proxy': false,
        'window-state': {},
      },
      /* eslint-enable quote-props */
    })
     
  }

  fixSystemConfig() {
    // Remove aria2c unrecognized options
    const { others } = separateConfig(this.systemConfig.store)
    if (!others) {
      return
    }

    Object.keys(others).forEach((key) => {
      this.systemConfig.delete(key)
    })

    // Fix spawn ENAMETOOLONG on Windows
    const tracker = reduceTrackerString(this.systemConfig.get('bt-tracker'))
    this.setSystemConfig('bt-tracker', tracker)
  }
 
  getSystemConfig(key, defaultValue) {
    if (typeof key === 'undefined' && typeof defaultValue === 'undefined') {
      return this.systemConfig.store
    }

    return this.systemConfig.get(key, defaultValue)
  }

  getUserConfig(key, defaultValue) {
    if (typeof key === 'undefined' && typeof defaultValue === 'undefined') {
      return this.userConfig.store
    }

    return this.userConfig.get(key, defaultValue)
  }
  setSystemConfig(...args) {
    this.systemConfig.set(...args)
  }

  setUserConfig(...args) {
    this.userConfig.set(...args)
  }

  reset() {
    this.systemConfig.clear()
    this.userConfig.clear()
  }
}
