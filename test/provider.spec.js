'use strict'

/*
 * adonis-bugsnag
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const test = require('japa')
const path = require('path')
const { Config, Env, Helpers } = require('@adonisjs/sink')
const { ioc } = require('@adonisjs/fold')
const BugSnagMiddleware = require('../src/BugSnag/Middleware/BugSnagUser.js')
const BugSnagProvider = require('../providers/BugSnagProvider.js')
const BugSnag = require('../src/BugSnag/index.js')

test.group('AdonisJS BugSnag Provider Test(s)', (group) => {
  group.before(() => {
    ioc.singleton('Adonis/Src/Config', () => {
      let config = new Config()
      config.set('bugsnag.apiKey', 'q24cd5317608c5353de0794576ee015q')
      config.set('bugsnag.trackViaSession', false)
      return config
    })

    ioc.singleton('Env', () => {
      let env = new Env()
      env.set('NODE_ENV', 'development')
      return env
    })

    ioc.singleton('Helpers', () => {
      let helpers = new Helpers(path.join(__dirname, '..'))
      return helpers
    })
  })

  test('provider instance registers instance(s) as expected', async (assert) => {
    let provider = new BugSnagProvider(ioc)
    provider.register()

    assert.instanceOf(ioc.use('Adonis/Addons/BugSnag'), BugSnag)
    assert.instanceOf(ioc.use('Adonis/Middleware/BugSnagUser'), BugSnagMiddleware)
  })
})
