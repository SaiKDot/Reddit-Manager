import { EventEmitter } from 'events'
import snoowrap from 'Snoowrap'
import Store from 'electron-store'

export default class LinksManager extends EventEmitter {
  constructor() {
    super()    
    this.store = new Store({})
  }
  groupAndCollectBySameKeyValue({ key, result }, item) {
   
    const groupValue = item[key];  
    ((result[groupValue] ??= [])).push(item)
    return { key, result }
  }

  reduceAndSort(array, param = 'default') {
    const reducedArr = array.reduce(this.groupAndCollectBySameKeyValue, {
      key: 'subreddit',
      result: {},
    }).result
    const mappedObj = Object.entries(reducedArr)
      .map(([key, value]) => ({ [key]: value }))
      .sort((a, b) =>
        param == 'rank'
          ? Object.values(b)[0].length - Object.values(a)[0].length
          : param == 'rank'
          ? Object.keys(a)[0].localeCompare(Object.keys(b)[0]) ||
            Object.values(b)[0].length - Object.values(a)[0].length
          : 0
      )
    return mappedObj
  }

  getPosts() {
     const links = this.store.get('savedPosts')
     return this.reduceAndSort(links)
  }

  async openPostsFile() {
    var open = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'CSV', extensions: ['csv'] }],
    })

    if (open.canceled === true) return

    const fileString = await this.readCsv(open.filePaths[0])
    const posts = fileString.map(({ permalink, id }) => {
      const subreddit = permalink.split('/')[4]
      const postId = id
      return { permalink, subreddit, postId }
    })
    const groupedPosts = this.mapObj(posts, 'rank')
    this.saveFiles.set('savedPosts', posts)
    this.sendMessageToAll('main:recievedPosts', groupedPosts)
  }
}