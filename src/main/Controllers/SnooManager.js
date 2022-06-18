import { EventEmitter } from 'events'
import snoowrap from 'Snoowrap'
import * as Promise from 'bluebird'

export default class MainProcess extends EventEmitter {
  constructor(sub) {
    super()
    this.subreddit = sub
     
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
  retrieveSubmissions(posts) {
    console.log({posts})
    Promise.all(
      posts.map(async (post) => {
        // const submission = snoo.getSubmission('4j8p6d')
        return await reddit.getSubmission('4j8p6d').fetch() //param is string

        // submission.fetch()
      })
    )
      .then((responses) =>
        Promise.all(responses.map((res) => console.log(res)))
      )
      .then((res) => {
        console.log(res)
      })
  }
}
