# Pretty REPL

![Node.js CI](https://github.com/mmarcon/pretty-repl/workflows/Node.js%20CI/badge.svg)

An extension of the Node REPL (`repl.REPLServer`) that applies syntax highlighting as the user types.

![Pretty REPL Screenshot](./images/screenshot.png)

## How to use it

Install the package:

```bash
$ npm install --save pretty-repl
```

Use the package:

```javascript
const repl = require('pretty-repl');

const options = {
    prompt: '→ '
};

repl.start(options);
```

`options` is an an object with the [same options](https://nodejs.org/api/repl.html#repl_repl_start_options) as `repl.REPLServer`.

Additionally, it's possible to pass an additional `colorize` property to the options object:

```javascript
{
    colorize: function (str) {
        // str is the the string in input.
        // the function should return the string that has been colorized to output in the REPL.
    }
}
```

In order to highlighting matching pairs of brackets, a `colorizeMatchingBracket`
is also available.

## Credits

Pretty repl is inspired and includes code fragments from:
* https://github.com/nodejs/repl
* https://github.com/aantthony/node-color-readline
