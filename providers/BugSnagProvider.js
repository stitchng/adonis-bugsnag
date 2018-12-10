'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class BugSnagProvider extends ServiceProvider {
  register () {
    this.app.singleton('Adonis/Addons/BugSnag', () => {
      const Config = this.app.use('Adonis/Src/Config')
      const BugSnagHelper = require('../src/BugSnag')
      return new BugSnagHelper(require('@bugsnag/js'), Config)
    })
  }
}

module.exports = BugSnagProvider
