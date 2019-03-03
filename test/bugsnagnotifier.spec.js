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
const { ioc } = require('@adonisjs/fold')
const { Config, Helpers } = require('@adonisjs/sink')
const BugSnag = require('../src/index.js')

let BugSnagJSNotifierStub = null


test.group('Adonis BugSnag Test(s)', (group) => {
  group.beforeEach(() => {
    BugSnagJSNotifierStub = require('setup/notifier-stub')
    
    this.helpers = new Helpers(path.join(__dirname, './'))
    this.config = new Config()
    this.env = new Env()
  })
  
  test('instantiate without errors or side-effects [yet]', () => {
      this.config.set('bugsnag.apiKey', '');
      this.config.get('bugsnag.track', false);
      this.env.set('NODE_ENV', 'development');
    
      const AdonisBugSnagNotifierInstance = new BugSnag(BugSnagJSNotifierStub, this.config, this.helpers, this.env)

      assert.isTrue(AdonisBugSnagNotifierInstance.notifier !== null)
  })
  
  test('user property on [inert] notifier is set', () => {
  
  })
})
