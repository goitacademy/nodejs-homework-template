# handle-backspaces

Apply backspace characters to a string or UTF-8 Buffer.

```js
import handleBackspaces from 'handleBackspaces';

const input = 'abc\u0008def';
const output = handleBackspaces(input);
// output === abdef
```

## LICENSE

Apache-2.0
