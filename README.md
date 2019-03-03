# adonis-bugsnag

An addon/plugin package to provide BugSnag error reporting services in AdonisJS 4.0+

## Getting Started

>Install from the NPM Registry

```bash

    $ npm i --save @adonisjs/adonis-bugsnag
    
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

    npm run test

```

## Credits

- Ifeora Okechukwu <Head Of Technology - Oparand> (https://twitter.com/isocroft)
- Ahmad Aziz <Head - NodeJS Foundation> (https://instagram.com/dev_amaz)
    
## Contributing
