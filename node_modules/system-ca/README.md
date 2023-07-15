# system-ca

Access the system certificate store on Windows, macOS and Linux.

```js
import { systemCertsSync, systemCertsAsync } from 'system-ca';

console.log(systemCertsSync())
console.log(await systemCertsAsync())

tls.connect({
  host: 'google.com',
  port: 443,
  ca: await systemCertsAsync({ includeNodeCertificates: true })
})
```

The `systemCertsSync()` and `systemCertsAsync()` functions perform the same
operation, namely, listing all trusted certificates as an array of PEM-formatted
X.509 certificates.

The result can be passed directly to the `ca` option of `tls.connect()`
and similar methods.

- Using `systemCertsAsync()` may be preferable, because accessing the
  system store can be slow, especially on Windows.
- `systemCertsAsync()` uses a worker thread under the hood on Windows and macOS.
- On Windows and macOS, this package always uses native addons for accessing
  the system certificate store.
- On all other platforms, both the async and the sync variant read from the
  typical system locations for storing trusted certificates (i.e. `/etc/ssl`, `/etc/pki`).

## LICENSE

Apache-2.0
