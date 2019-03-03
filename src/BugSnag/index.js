'use strict'

const getPkgJSON = (helpers) => require(helpers.appRoot('package.json'))

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

  setAuthUser (user) {
    this.notifier.user = user
  }

  setContext (request) {
    this.notifier.context = {
      routeName: typeof request.currentRoute === 'function' ? request.currentRoute() : { middleware: null }
    }
  }

  addMetaData (metaData) {
    this.notifier.metaData = metaData
  }

  notify (error, request, metaData, extraMetaData) {
    if (request.user) {
      this.setAuthUser(request.user)
    }

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
