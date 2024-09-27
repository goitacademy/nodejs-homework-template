# askcharacter

Prompt for a single character

```js
import askcharacter from 'askcharacter';

console.log('Please enter a character:');
const char = await askcharacter(process.stdin);
console.log('You entered the following askcharacter:', char.toString());
```

The stream passed to `askcharacter` can be any kind of `Readable` stream.
If it is a TTY, `askcharacter` will temporarily remove all other `'data'` and
`'readable'` listeners from it, and set the TTY into raw mode if it has not
been in raw mode to begin with.

## Why not use [`read`](https://www.npmjs.com/package/read) instead?

Because `read `does not work inside a Node.js REPL.

## LICENSE

Apache-2.0
