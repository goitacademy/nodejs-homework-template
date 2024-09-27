# hijack-stream

Temporarily take over a readable stream.

```js
import hijackStream from 'hijack-stream';

const { restore } = hijackStream({
  input: process.stdin,
  ondata(chunk) { if (chunk.includes('done')) restore(); },
  onend(error) { if (error !== null) console.warn(error); }
})
```

## Why not use [`read`](https://www.npmjs.com/package/read) instead?

Because `read `does not work inside a Node.js REPL.

## LICENSE

MIT
