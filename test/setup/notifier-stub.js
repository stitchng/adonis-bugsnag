const Notifier = function () {
  return {
    notify: function (err, options) {
      if (err instanceof Error) {
        this.report.error = err
      }

      if (options instanceof Object &&
          typeof options.beforeSend === 'function') {
        options.beforeSend(this.report)
      }

      this.notified = true
    },
    startSession: function () {
      this.sessionStarted = true
    },
    report: { request: {}, error: null },
    notified: false,
    sessionStarted: false
  }
}

module.exports = Notifier
