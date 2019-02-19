'use strict'

class BugSnagUser {

    async handle ({ request, auth }, next){
          
          let _user = await (typeof (auth.getUser) === 'function' ? auth.getUser() : Promise.resolve(null))
          
          request.user = _user
    }
}

module.exports = BugSnagUser
