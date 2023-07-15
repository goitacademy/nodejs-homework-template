# macos-export-certificate-and-key

Access the macOS system certificate and key store.
This module is a native addon. It will only successfully work on macOS 10.12+. No prebuilt binaries are currently provided.

## API

### `exportCertificateAndPrivateKey(opts?)`

Export a certificate and its corresponding private key from the macOS CA store.

Valid options are:

- `subject`: Subject line of the certificate/key as a string.
- `thumbprint`: Thumbprint of the certificate/key as a Uint8Array.
  Either `subject` or `thumbprint` must be provided.

This function returns a single certificate (and by default its private key)
combination as a .pfx file, along with a random passphrase that has been
used for encrypting the file.
It will throw an exception if no relevant certificate could be found.
The certificate in question can be specified either through its subject line
string or its thumbprint.

When exporting, the user will be prompted to enter his password to allow keychain access.

### `exportSystemCertificates()`

Export all system certificates (no private keys).

## Testing
You need to import [`testkeys\certificate.pfx`](./testkeys/certificate.pfx) manually into your local keychain in order for the tests to pass. The password for the file is `pass`.
