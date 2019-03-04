# adonis-bugsnag

An addon/plugin package to provide BugSnag error reporting services in AdonisJS 4.0+

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls][coveralls-image]][coveralls-url]

<img src="http://res.cloudinary.com/adonisjs/image/upload/q_100/v1497112678/adonis-purple_pzkmzt.svg" width="200px" align="right" hspace="30px" vspace="140px">

## Getting Started

>Install from the NPM Registry

```bash

    $ npm i --save adonisjs-bugsnag
    
    $ adonis make:ehandler

```

>Format the _Exceptions/Handler.js_ file for an AdonisJS application to look like this

```js

const BaseExceptionHandler = use('BaseExceptionHandler')
const bugsnag = use('BugSnag')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
	/**
	 * Handle exception thrown during the HTTP lifecycle
	 *
	 * @method handle
	 *
	 * @param  {Object} error
	 * @param  {Object} options.request
	 * @param  {Object} options.response
	 *
	 * @return {void}
	 */
	async handle(error, { request, response }) {

		if (error.code === 'EBADCSRFTOKEN') {
			response.forbidden('Cannot process request because this page expired!')
			return
		}

		response.status(error.status).send(error.message)
	}


	/**
	 * Report exception for logging or debugging.
	 *
	 * @method report
	 *
	 * @param  {Object} error
	 * @param  {Object} options.request
	 *
	 * @return {void}
	 */
	async report(error, { request }) {


		let metaData = {
			headers: request.headers(),
			format: request.format(),
			method: request.method().toLowerCase()
		};

		metaData[(metaData.method == "get" ? "querystring" : "entity_body")] = request.all()

		await bugsnag.notify(error, request, metaData)

	}


}

module.exports = ExceptionHandler

```

## License

MIT

## Running Tests

```bash

    npm i

```

```bash

	npm run lint
    npm run test

```

## Credits

- [Ifeora Okechukwu <Head Of Technology - Oparand>](https://twitter.com/isocroft)
- [Ahmad Aziz <Head - NodeJS Foundation>](https://instagram.com/dev_amaz)
    
## Contributing

See the [CONTRIBUTING.md](https://github.com/stitchng/adonisjs-bugsnag/blob/master/CONTRIBUTING.md) file for info

[npm-image]: https://img.shields.io/npm/v/adonisjs-bugsnag.svg?style=flat-square
[npm-url]: https://npmjs.org/package/adonisjs-bugsnag

[travis-image]: https://img.shields.io/travis/stitchng/adonis-bugsnag/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/stitchng/adonis-bugsnag

[coveralls-image]: https://img.shields.io/coveralls/stitchng/adonis-bugsnag/develop.svg?style=flat-square

[coveralls-url]: https://coveralls.io/github/stitchng/adonis-bugsnag
