# mongodb-redact [![][npm_img]][npm_url] [![][travis_img]][travis_url]

Remove potentially sensitive information from objects without changing the shape.

Inspired by [fruitsalad][fruitsalad] and [mongo-redact][mongo-redact].

## Installation

```bash
npm install --save mongodb-redact
```

## API

```javascript
var redact = require('mongodb-redact');

// `variable` can be of any type, including object and array.
var result = redact(variable);
```

## Redaction

The following types of strings are currently redacted:

- Certificates and private keys
- Electron application resource directories (Windows, OS X, Linux)
- Generic user directories (Windows, OS X, Linux)
- Email addresses
- IP addresses
- URLs
- MongoDB connection strings

Does **not redact** any non-string types (e.g. numbers, dates, etc).

For examples, see `./test/index.test.js`.


## License
Apache 2.0

[travis_img]: https://secure.travis-ci.org/mongodb-js/redact.svg?branch=master
[travis_url]: https://travis-ci.org/mongodb-js/redact
[npm_img]: https://img.shields.io/npm/v/mongodb-redact.svg
[npm_url]: https://www.npmjs.org/package/mongodb-redact
[fruitsalad]: https://github.com/rueckstiess/fruitsalad
[mongo-redact]: https://github.com/jonrangel/mongo-redact
