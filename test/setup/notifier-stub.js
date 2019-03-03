
module.exports = {
  notify: function (err, options) {
    this.notified = true
  },
  startSession: function () {
    this.sessionStarted = true
  },
  notified: false,
  sessionStarted: false
}
