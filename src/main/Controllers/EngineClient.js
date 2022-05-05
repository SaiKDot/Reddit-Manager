import { Aria2 } from '@shared/aria2'

import logger from '../Helpers/Logger'
import {
  compactUndefined,
  formatOptionsForEngine
} from '@shared/utils'
import {
  ENGINE_RPC_HOST,
  ENGINE_RPC_PORT,
  EMPTY_STRING
} from '@shared/constants'

const defaults = {
  host: ENGINE_RPC_HOST,
  port: ENGINE_RPC_PORT,
  secret: EMPTY_STRING
}

export default function EngineClient(options = {}) {
   
    let instance = null
    let client = null
    options = {
      ...defaults,
      ...options
    }
    init()

   function init() {
        connect()
   }

   function connect () {
      logger.info('>> App << main engine client connect', options)
      const { host, port, secret } = options
      client = new Aria2({
        host,
        port,
        secret
      })
   }

   async function call (method, ...args) {
    return client.call(method, ...args).catch((err) => {
      logger.warn('>> App << call client fail:', err.message)
    })
   }

   async function changeGlobalOption (options) {
     logger.info('>> App << change engine global option:', options)
     const args = formatOptionsForEngine(options)
     return call('changeGlobalOption', args)
   }

   this.shutdown = async function (optionsParam = {}) {
     const { force = false } = optionsParam
     const { secret } = options

     const method = force ? 'forceShutdown' : 'shutdown'
     const args = compactUndefined([secret])
     return call(method, ...args)
   }

}
