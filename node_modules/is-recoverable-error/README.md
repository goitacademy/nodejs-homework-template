# is-recoverable-error

isRecoverableError function from [Node.js
REPL](https://github.com/nodejs/node/blob/e322f74ce1f8ff3ce1224a7ea9264542871aec3b/lib/internal/repl/utils.js)

# Usage
```js
var isRecoverableError = require('is-recoverable-error')
var repl = require('repl')
var vm = require('vm')

function myEval (input, context, filename, callback) {
  var result
  try {
    result = vm.runInThisContext(input)
  } catch (e) {
    if (isRecoverableError(input)) {
      return callback(new repl.Recoverable(e))
    }
  }
  callback(null, result)
}
```

## API
### isRecoverableError(input)
Where input is a string. Returns a boolean.

```js
isRecoverableError('function x () {') // returns true
isRecoverableErorr('<cat>') // returns false
```


# Installation
```
npm install -S is-recoverable-error
```

# License
MIT
