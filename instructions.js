'use strict'

/**
 * adonis-bugsnag
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 * @extended Oparand - Ifeora Okechukwu <isocroft@gmail.com> | Aziz Abdul <>
 */

const path = require('path')

module.exports = async function (cli) {
  try {
    await cli.makeConfig('bugsnag.js', path.join(__dirname, 'config/bugsnag.js'))
    cli.command.completed('create', 'config/bugsnag.js')
  } catch (error) {
    // ignore if bugsnag.js already exists...
  }
}
