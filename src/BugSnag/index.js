'use strict'

const getPkgJSON = (helpers) => require(`${helpers.appRoot()}/package.json`)

class BugSnagAPIClient {
  constructor (Notifier, Config, Helpers, Env) {
    let usePlugins = []
    let pkg = getPkgJSON(Helpers)

    this.notifier = Notifier({
      appVersion: pkg.version,
      collectUserIp: true,
      releaseStage: Env.get('NODE_ENV'),
      apiKey: Config.get('bugsnag.apiKey'),
      otherOptions: {}
    }, usePlugins)

    if (Config.get('bugsnag.trackViaSession') === true) {
      this.notifier.startSession()
    }
  }

  setAuthUser (user = null) {
    this.notifier.user = user
  }

  setContext (request = {}, session = {}) {
    this.notifier.context = {
      route: typeof request.currentRoute === 'function' ? request.currentRoute() : {},
      cookies: typeof request.cookies === 'function' ? request.cookies() : {},
      session: typeof session.all === 'function' ? session.all() : {}
    }
  }

  addMetaData (metaData = {}) {
    this.notifier.metaData = metaData
  }

  setDevice (device = {}) {
    this.notifier.device = device
  }

  notify (error, request, metaData, extraMetaData) {
    if (metaData) {
      this.addMetaData(metaData)
    }

    this.notifier.notify(error, {
      beforeSend: function (report) {
        // Filter out sensitive information
        report.request.url = request.url() || '[REDACTED]'

        // Add additional diagnostic information
        if (extraMetaData) {
          // report.removeMetaData('extra', '')
          report.updateMetaData('extra', extraMetaData)
        }
      }
    })
  }
}

module.exports = BugSnagAPIClient
