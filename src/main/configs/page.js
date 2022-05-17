import is from 'electron-is'

export default {
  index: {
    attrs: {
      title: 'BSK',
      width: 1024,
      height: 768,
      minWidth: 478,
      minHeight: 420,
      // backgroundColor: '#FFFFFF',
      transparent: !is.windows()
    },    
    url: is.dev() ? 'http://localhost:3002' : require('path').join('file://', __dirname, '/index.html')
  }
}
