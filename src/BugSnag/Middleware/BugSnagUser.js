'use strict'

class BugSnagUser {
  constructor (bugsnag) {
    this.notifierWrapper = bugsnag
  }

  async handle ({ request, session, auth }, next) {
    try {
      let _user = await (typeof (auth.getUser) === 'function' ? auth.getUser() : Promise.resolve(null))

      this.notifierWrapper.setAuthUser(_user)
      this.notifierWrapper.setContext(request, session)
    } catch {
      ;
    }

    try {
      await next()
    } catch (error) {
      this.notifierWrapper.notify(error, request)
    }
  }
}

module.exports = BugSnagUser
