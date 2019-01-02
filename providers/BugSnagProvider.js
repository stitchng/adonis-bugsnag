'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class BugSnagProvider extends ServiceProvider {
  register () {
    this.app.singleton('Adonis/Addons/BugSnag', () => {
      const Config = this.app.use('Adonis/Src/Config')
      const BugSnag = require('../src/BugSnag')
      return new BugSnag(require('@bugsnag/js'), Config)
    })
  }
}

module.exports = BugSnagProvider
