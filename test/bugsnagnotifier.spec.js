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
    
    this.helpers = new Helpers(path.join(__dirname, '..'))
    this.config = new Config()
    this.env = new Env()
  })
  
  test('instantiate without errors or side-effects [yet]', () => {
      this.config.set('bugsnag.apiKey', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      this.config.get('bugsnag.trackViaSession', false);
      this.env.set('NODE_ENV', 'development');
    
      const AdonisBugSnagNotifierInstance = new BugSnag(BugSnagJSNotifierStub, this.config, this.helpers, this.env)

      assert.isTrue(typeof AdonisBugSnagNotifierInstance.setAuthUser === 'function')
      assert.isTrue(typeof AdonisBugSnagNotifierInstance.addMetaData === 'function')
      assert.isTrue(typeof AdonisBugSnagNotifierInstance.notify === 'function')
      assert.isTrue(AdonisBugSnagNotifierInstance.notifier !== null)
  })
  
  test('user property on [inert] notifier is set', () => {
      this.config.set('bugsnag.apiKey', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      this.config.get('bugsnag.trackViaSession', false);
      this.env.set('NODE_ENV', 'development');
    
      const AdonisBugSnagNotifierInstance = new BugSnag(BugSnagJSNotifierStub, this.config, this.helpers, this.env)
      AdonisBugSnagNotifierInstance.setAuthUser({id:1, name:'Heyyo!', email:'xyz@abc.com'})
      
      assert.deepEqual(AdonisBugSnagNotifierInstance.notifier.user, {id:1, name:'Heyyo!', email:'xyz@abc.com'})
  })
  
  test('session is started on config [trackViaSession] set to true', () => {
      this.config.set('bugsnag.apiKey', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      this.config.get('bugsnag.trackViaSession', true);
      this.env.set('NODE_ENV', 'development');
    
      const AdonisBugSnagNotifierInstance = new BugSnag(BugSnagJSNotifierStub, this.config, this.helpers, this.env)
      
      assert.isTrue(BugSnagJSNotifierStub.sessionStarted)
  })
})
