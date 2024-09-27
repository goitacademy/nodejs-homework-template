# askpassword

A password prompt that does not print data to the TTY.

```js
import askpassword from 'askpassword';

console.log('Please enter a password:');
const password = await askpassword(process.stdin);
console.log('You entered the following password:', password.toString());
```

The stream passed to `askpassword` can be any kind of `Readable` stream.
If it is a TTY, `askpassword` will temporarily remove all other `'data'` and
`'readable'` listeners from it, and set the TTY into raw mode if it has not
been in raw mode to begin with.

## Why not use [`read`](https://www.npmjs.com/package/read) instead?

Because `read `does not work inside a Node.js REPL.

## LICENSE

Apache-2.0
