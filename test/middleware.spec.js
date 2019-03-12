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
const { Config, Env, Helpers  } = require('@adonisjs/sink')
const { ioc } = require('@adonisjs/fold')
const BugSnagMiddleware = require('../src/BugSnag/Middleware/BugSnagUser.js')
const BugSnag = require('../src/BugSnag/index.js')

test.group('AdonisJS BugSnag Middleware Test(s)', (group) => {
  group.before(() => {
    ioc.singleton('Adonis/Src/Config', () => {
      let config = new Config()
      config.set('bugsnag.apiKey', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
      config.set('bugsnag.trackSession', false)
      return config
    })

    ioc.singleton('Adonis/Src/Env', () => {
      let env = new Env()
    })

    ioc.singleton('Adonis/Src/Helpers', () => {
      let helper = new Helpers('..')
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
    const middleware = new BugSnagMiddleware(new BugSnag())

    middleware
      .handle(context, async function () {
        return true
      })
      .then(() => {
        assert.isTrue(!!BugSnag.notifier.user)
        assert.equal(request.user.id, 1)
      })
  })
})
