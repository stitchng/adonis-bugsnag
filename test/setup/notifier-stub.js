module.exports = {
  notify: function () {
    this.notified = true
  },
  startSession: function () {
    this.sessionStarted = true
  },
  notified: false,
  sessionStarted: false
}
