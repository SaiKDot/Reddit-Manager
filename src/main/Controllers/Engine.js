import { app } from 'electron'
import is from 'electron-is'
import { existsSync, writeFile, unlink } from 'fs'
import { resolve, join } from 'path'
import { spawn } from 'child_process'
import logger from '../Helpers/Logger'
 
 
import { 
  getSessionPath  
} from '../utils/index'

const { platform } = process
let basePath
let systemConfig
let userConfig

import engineBinMap from '../configs/engine'

export default function Engine (options) {

 
  basePath = getBasePath()
  systemConfig = options.systemConfig
  userConfig = options.userConfig

  let instance = null

  this.start = function () {
    const pidPath = getEnginePidPath()
    logger.info('>> App << Engie pid path:', pidPath)

    if (instance) {
      return
    }

    const binPath = getBinPath()
    const args = getStartArgs()
    instance = spawn(binPath, args, {
      windowsHide: false,
      stdio: is.dev() ? 'pipe' : 'ignore'
    })
    const pid = instance.pid.toString()

    writePidFile(pidPath, pid)

    instance.once('close', function () {
      try {
        unlink(pidPath, function (err) {
          if (err) {
            logger.warn(`>> App << Unlink engine process pid file failed: ${err}`)
          }
        })
      } catch (err) {
        logger.warn(`>> App << Unlink engine process pid file failed: ${err}`)
      }
    })

    if (is.dev()) {
      // instance.stdout.on('data', function (data) {
      //   logger.info(data)
      // })

      instance.stderr.on('data', function (data) {
        logger.log('>> App << engine stderr===>', data.toString())
      })
    }
  }

  this.stop = function() {
    if (instance) {
      instance.kill()
      instance = null
    }
  }

  this.isRunning = function(pid) {
    try {
      return process.kill(pid, 0)
    } catch (e) {
      return e.code === 'EPERM'
    }
  }
  
  this.restart = function () {
    this.stop()
    this.start()
  }
}

//end

function getBasePath () {
    let result = resolve(app.getAppPath(), '..')

    if (is.dev()) {
      result = resolve(__dirname, `../../../extra/${platform}`)
    }

    return result
 }

 function  getBinPath () {
     const binName = getEngineBin(platform)
     if (!binName) {
       throw new Error('The engine is damaged, please reinstall : (')
     }

     const result = join(basePath, `/engine/${binName}`)
     const binIsExist = existsSync(result)
     if (!binIsExist) {
       logger.error('>> App << engine bin does not exist:', result)
       throw new Error('The engine is missing, please reinstall : (')
     }

     return result
 }

 function getStartArgs () {
   const confPath = join(basePath, '/engine/aria2.conf')

   const sessionPath = userConfig['session-path'] || getSessionPath()
   const sessionIsExist = existsSync(sessionPath)

   let result = [`--conf-path=${confPath}`, `--save-session=${sessionPath}`]
   if (sessionIsExist) {
     result = [...result, `--input-file=${sessionPath}`]
   }

   const extraConfig = {
     ...systemConfig
   }
   const keepSeeding = userConfig['keep-seeding']
   const seedRatio = systemConfig['seed-ratio']
   if (keepSeeding || seedRatio === 0) {
     extraConfig['seed-ratio'] = 0
     delete extraConfig['seed-time']
   }

   const extra = transformConfig(extraConfig)
   result = [...result, ...extra]

   return result
}

function writePidFile (pidPath, pid) {
    writeFile(pidPath, pid, (err) => {
      if (err) {
        logger.error(`>> App << Write engine process pid failed: ${err}`)
      }
    })
 }

 // UTILS 

function getEnginePidPath () {
  return resolve(app.getPath('userData'), './engine.pid')
}

function transformConfig (config) {
  const result = []
  for (const [k, v] of Object.entries(config)) {
    if (v !== '') {
      result.push(`--${k}=${v}`)
    }
  }
  return result
}

export function getEngineBin (platform) {
  const result = engineBinMap[platform] || ''
  return result
}




