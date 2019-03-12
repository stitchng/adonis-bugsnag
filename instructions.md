## Registering provider

Like any other provider, you need to register the provider inside `start/app.js` file.

```js
const providers = [
  'adonisjs-bugsnag/providers/BugSnagProvider'
]
```

## Registering middleware

Register the following middleware inside `start/kernel.js` file. Place the bugsnag middleware after the 'Adonis/Middleware/AuthInit' middleware

```js
const globalMiddleware = [
  ...
  'Adonis/Middleware/AuthInit',
  'Adonis/Middleware/BugSnagUser'
]
```

## Config

The configuration is saved inside `config/bugsnag.js` file. Tweak it accordingly.

## Docs

To find out more, read the docs [here](https://github.com/stitchng/adonis-bugsnag).
