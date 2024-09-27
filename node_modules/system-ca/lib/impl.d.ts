export declare function unixSyncImpl(env: Record<string, string | undefined>): Iterable<string>;
export declare function unixAsyncImpl(env: Record<string, string | undefined>): AsyncIterable<string>;
export declare function windowsImpl(): Iterable<string>;
export declare function macosImpl(): Iterable<string>;
