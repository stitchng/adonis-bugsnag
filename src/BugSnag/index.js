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

  addExtraMetaData (extraMetaData) {
    this.notifier.$extraMetaData = extraMetaData
  }

  setRuntimeDebugTrail (runtimeProcessName = '', runtimeProcessData = '{}') {
    if (typeof this.notifier.leaveBreadcrumb === 'function') {
      this.notifier.leaveBreadcrumb(
        runtimeProcessName,
        runtimeProcessData,
        'state',
        Date.now()
      )
      return true
    }
    return false
  }

  setRuntimeInfoTrail (runtimeProcessName = '', runtimeProcessData = '{}', suffix = '') {
    if (typeof this.notifier.leaveBreadcrumb === 'function') {
      this.notifier.leaveBreadcrumb(
        runtimeProcessName,
        runtimeProcessData,
        'process' + suffix,
        Date.now()
      )
      return true
    }
    return false
  }

  setDevice (device = {}) {
    this.notifier.device = device
  }

  notify (error, request, metaData, extraMetaData) {
    if (metaData) {
      this.addMetaData(metaData)
    }

    const extras = extraMetaData || this.notifier.$extraMetaData || null

    this.notifier.notify(error, {
      beforeSend: function (report) {
        /* @HINT: Filter out sensitive information */
        report.request.url = request.url() || '[REDACTED]'

        /* @HINT: Add additional diagnostic information */
        if (extras) {
          report.updateMetaData('extra', extras)
        }
      }
    })
  }
}

module.exports = BugSnagAPIClient
