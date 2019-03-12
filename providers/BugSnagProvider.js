'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class BugSnagProvider extends ServiceProvider {
  register () {
    this.app.singleton('Adonis/Addons/BugSnag', () => {
      const Config = this.app.use('Adonis/Src/Config')
      const Helpers = this.app.use('Helpers')
      const Env = this.app.use('Env')
      const BugSnag = require('../src/BugSnag')

      return new BugSnag(require('@bugsnag/js'), Config, Helpers, Env)
    })

    this.app.alias('Adonis/Addons/BugSnag', 'BugSnag')

    this.app.bind('Adonis/Middleware/BugSnagUser', (app) => {
      let BugSnagUser = require('../src/BugSnag/Middleware/BugSnagUser')
      return new BugSnagUser(this.app.use('Adonis/Addons/BugSnag'))
    })
  }
}

module.exports = BugSnagProvider
