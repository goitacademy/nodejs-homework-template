# os-dns-native

Perform DNS queries using native OS APIs. Unlike the built-in `dns.resolve*`
family of functions, this module talks to the OS instead of performing UDP
queries.

Currently, A (IPv4), AAAA (IPv6), CNAME, TXT and SRV are supported.

The library exports match a subset of the Node.js `dns` module's. There is an
extra `.withNodeFallback` variant that allows using the OS methods with a
fallback to the Node.js methods if the former failed.

```js
import osDns from 'os-dns-native';
const addresses = await osDns.promises.resolve6('example.org');
console.log(addresses);  // [ '2606:2800:220:1:248:1893:25c8:1946' ]

// Tries the OS API first, falls back to Node.js's own dns.promises.resolve6.
await osDns.withNodeFallback.promises.resolve6('example.org');
```
