declare type LookupOptions = {
  subject: string;
  thumbprint?: never;
} | {
  subject?: never;
  thumbprint: Uint8Array;
};

declare interface PfxResult {
  passphrase: string;
  pfx: Uint8Array;
};

declare function exportCertificateAndPrivateKey(input: LookupOptions): PfxResult;

declare namespace exportCertificateAndPrivateKey {
  function exportCertificateAndPrivateKey(input: LookupOptions): PfxResult;

  function exportSystemCertificates(input: StoreOptions): string[];
}

export = exportCertificateAndPrivateKey;
