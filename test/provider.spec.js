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
const { Config, Helpers } = require('@adonisjs/sink')
const BugSnag = require('../src/providers/BugSnagProvider.js')

test.group('Adonis BugSnag Test(s)', (group) => {
  group.beforeEach(() => {
    this.helpers = new Helpers(path.join(__dirname, './'))
  })
})
