var uuid = require('node-uuid')
var client = require('./ws/client')

var app = {
  User: require('./rpc/user'),

  heartbeat: function(beat, callback) {
    client.connect(function(err) {
      client.notify(request('heartbeat', { beat: beat }), function(err, result) {
        if(err) {
          console.log('heartbeat failed: ' + JSON.stringify(err))
        } 
        client.close()
      })
    })
  },

  ping: function(callback) {
    client.connect(function(err) {
      client.rsvp(request('ping', {}, uuid.v4()), function(err, result) {
        if(err) {
          console.log('ping failed: ' + JSON.stringify(err))
        }  else {
          console.log(result)
        }
        client.close()
      })
    })
  }
}

module.exports = app