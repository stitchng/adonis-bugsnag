'use strict';

const getPkgJSON = (helpers) => require(helpers.appRoot('package.json'))

class BugSnagAPIClient {
	constructor(Notifier, Config, Helpers, Env) {
		let usePlugins = [];
		let pkg = getPkgJSON(Helpers)
    
		this.notifier = Notifier({
			appVersion: pkg.version,
			collectUserIp: true,
			environment:Env.get('NODE_ENV'),
			apiKey: Config.get('bugsnag.apiKey')
		}, usePlugins)

	    	if(Config.get('busnag.trackViaSession') === true){
		    this.notifier.startSession();
	    	}
	}

	setAuthUser(user) {
		this.notifier.user = user;
	}

	addMetaData(metaData) {
		this.notifier.metaData = metaData;
	}

	notify(error, request, context, extraMetaData) {
		
		if(request.user){
			this.setAuthUser(request.user)
		}
		
		this.notifier.notify(error, {
			beforeSend: function (report) {
				// Filter out sensitive information
				report.request.url = request.url() || '[REDACTED]'
        
				// Context for the current report
				report.context = context || '[REDACTED]'
        
				// Add additional diagnostic information
        			if(extraMetaData){
				  	report.updateMetaData('extra', extraMetaData)
        			}
				
				//report.removeMetaData('extra', '')
			}
		});
	}
}

module.exports = BugSnagAPIClient
