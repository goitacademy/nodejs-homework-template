import type * as dns from 'dns';
declare let osDns: typeof dns & {
  withNodeFallback: typeof dns,
  wasNativelyLookedUp: (result: unknown) => boolean;
};
export = osDns;
