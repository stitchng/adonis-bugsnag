'use strict'

class BugSnagUser {
  constructor (bugsnag) {
    this.notifierWrapper = bugsnag
  }

  async handle ({ request, auth }, next) {
    
    try{
      let _user = await (typeof (auth.getUser) === 'function' ? auth.getUser() : Promise.resolve(null))

      this.notifierWrapper.notifierWrapper.setAuthUser(_user)
      this.notifierWrapper.setContext()
    }catch(err){
      ;
    }

    await next()
  }
}

module.exports = BugSnagUser
