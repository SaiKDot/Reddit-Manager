import is from 'electron-is'
import logger from 'electron-log'

logger.transports.file.level = is.production() ? 'warn' : 'silly'
logger.info('App Logger init')
logger.warn('App Logger init')
logger.log('App Logger init')

export default logger
