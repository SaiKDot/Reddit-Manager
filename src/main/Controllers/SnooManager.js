import { EventEmitter } from 'events'
import snoowrap from 'Snoowrap'
import * as Promise from 'bluebird'
import logger from '../Helpers/Logger'

export default class MainProcess extends EventEmitter {
  constructor(sub) {
    super()
    this.subreddit = sub
    this.reddit
    this.init()
  }
  init() {
    this.reddit = new snoowrap({
      userAgent:
        'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko',
      clientId: process.env.REDDIT_CLIENTID,
      clientSecret: process.env.REDDIT_SECRET,
      refreshToken: process.env.REDDIT_RFS_TOKEN,
    })
  }
  retrieve(posts) {
   return Promise.all(
      posts.map(
        async (post) =>
          await this.reddit
            .getSubmission(post.postId)
            .fetch()             
            .then(({ url, domain, media_metadata, permalink, gallery_data, thumbnail, id,is_self,is_video }) => {
              return { url, domain, media_metadata, permalink, gallery_data, thumbnail,id,is_self,is_video }
            })
      )
    )
      .then((responses) => Promise.all(responses.map((res) => res)))
      .then(res => console.log(res))
      .then((res) =>   {return {success: true, data:res}})
      .catch((err) => console.log(err))
      .catch((err) => { return { success: false, data: err }})
  }
  retrieveSubmissions(posts) {
    const self = this
      setInterval(function(){self.retrieve(posts)}, 500)
      
  }
}
