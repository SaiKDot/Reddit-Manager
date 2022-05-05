let events = require('events')
let em = new events.EventEmitter()
em.on('uncaughtException', function (err) {
    console.error(err);
});

module.exports.commonEmitter = em