'use strict'

class BugSnagUser {
  constructor (Config) {
    this.appSecret = Config.get('app.appKey')
  }

  async handle ({ request, auth }, next) {
    
    try{
      let _user = await (typeof (auth.getUser) === 'function' ? auth.getUser() : Promise.resolve(null))

      request.user = _user
    }catch(err){
      ;
    }

    await next()
  }
}

module.exports = BugSnagUser
