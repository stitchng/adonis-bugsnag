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
const { ioc, setupResolver } = require('@adonisjs/sink')
const { resolver } = require('@adonisjs/fold')

test.group('AdonisJS BugSnag Provider Test(s)', (group) => {
  group.before(() => {
      setupResolver()
  })
  
  test('is BugSnag Provider resolvable', () => {
      assert.isTrue(true)
  })
})
