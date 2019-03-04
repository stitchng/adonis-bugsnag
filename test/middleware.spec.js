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
const { Config, setupResolver } = require('@adonisjs/sink')
// const { resolver } = require('@adonisjs/fold')
const BugSnagMiddleware = require('../src/BugSnag/Middleware/BugSnagUser.js')

test.group('AdonisJS BugSnag Middleware Test(s)', (group) => {
  group.before(() => {
    setupResolver()
  })

  test('setup the request user upon handling', async (assert) => {
    const request = {
      url: () => 'https://127.0.0.1:333/dashboard/user',
      cookie: () => {}
    }

    const auth = {
      getUser: async () => {
         return Promise.resolve({id:1, full_name:'abc efg'})
      }
    }


    const context = { request, auth }
    const middleware = new BugSnagMiddleware(new Config())

    middleware
      .handle(context, async function () {
        return true
      })
      .then(() => {
          assert.isTrue(!!request.user)
          assert.equal(request.user.id, 1)
      })
  })
})
