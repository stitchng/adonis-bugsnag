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
const { Config, Env, Helpers  } = require('@adonisjs/sink')
const { ioc } = require('@adonisjs/fold')
const NotifierStub = require('./setup/notifier-stub.js')
const BugSnagMiddleware = require('../src/BugSnag/Middleware/BugSnagUser.js')
const BugSnag = require('../src/BugSnag/index.js')

test.group('AdonisJS BugSnag Middleware Test(s)', (group) => {
  group.before(() => {
    ioc.singleton('Adonis/Src/Config', () => {
      let config = new Config()
      config.set('bugsnag.apiKey', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
      config.set('bugsnag.trackViaSession', false)
      return config
    })

    ioc.singleton('Adonis/Src/Env', () => {
      let env = new Env()
      env.set('NODE_ENV', 'development')
      return env
    })

    ioc.singleton('Adonis/Src/Helpers', () => {
      let helpers = new Helpers(path.join(__dirname, '..'))
      return helpers
    })
    
  })

  test('setup the request user upon handling', async (assert) => {
    const request = {
      url: () => 'https://127.0.0.1:333/dashboard/user',
      cookies: () => {_gd1:'opened'}
    }
    
    const session = {
      all: () => {adonis_auth:'1'}
    }

    const auth = {
      getUser: async () => {
        return Promise.resolve({ id: 1, full_name: 'abc efg' })
      }
    }

    const context = { request, auth, session }
    const bugsnag = new BugSnag(NotifierStub, ioc.use('Adonis/Src/Config'), ioc.use('Adonis/Src/Helpers'), ioc.use('Adonis/Src/Env'))
    const middleware = new BugSnagMiddleware(bugsnag)

    middleware
      .handle(context, async function () {
        return true
      })
      .then(() => {
        assert.isTrue(!!bugsnag.notifier.user)
        assert.isTrue(!!bugsnag.notifier.context)
        assert.isTrue(!!bugsnag.notifier.context.session)
        assert.deepEqual(bugsnag.notifier.context.cookies, {_gd1:'opened'})
        assert.equal(bugsnag.notifier.user.id, 1)
      })
  })
})
