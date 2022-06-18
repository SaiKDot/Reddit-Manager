import { EventEmitter } from 'events'
import { createReadStream } from 'fs'
import csv from 'csv-parser'
import snoowrap from 'Snoowrap'
import Store from 'electron-store'
import logger from '../Helpers/Logger'

export default class LinksManager extends EventEmitter {
  constructor() {
    super()
    this.saveFiles = new Store({})
  }

  groupAndCollectBySameKeyValue({ key, result }, item) {
    const groupValue = item[key]
    ;(result[groupValue] ??= []).push(item)
    return { key, result }
  }

  reduceAndSort(array, param) {
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
  
  sortBy(param = 'default') {
    console.log('param',param)
    const sortedPosts = this.saveFiles
      .get('savedLinks')
      .sort((a, b) =>
        param == 'rank'
          ? Object.values(b)[0].length - Object.values(a)[0].length
          : param == 'alpha'
          ? Object.keys(a)[0].localeCompare(Object.keys(b)[0]) ||
            Object.values(b)[0].length - Object.values(a)[0].length
          : 0
      )
      console.log(sortedPosts.slice(0,10))
      return sortedPosts
  }

  readCsv(path) {
    let savedData = []
    return new Promise((resolve, reject) => {
      createReadStream(path)
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

  getLinksBySub(sub) {
    const links = this.saveFiles.get('savedLinks')
    logger.info(links[sub])
  }

  getAllLinks() {
    return this.saveFiles.get('savedLinks')
  }

  async readLinksFile(fileLink) {
    const fileString = await this.readCsv(fileLink)
    const posts = fileString.map(({ permalink, id }) => {
      const subreddit = permalink.split('/')[4]
      const postId = id
      return { permalink, subreddit, postId }
    })
    const groupedPosts = this.reduceAndSort(posts)
    this.saveFiles.set('savedLinks', groupedPosts)
    this.emit('recievedPosts', groupedPosts)
  }
}