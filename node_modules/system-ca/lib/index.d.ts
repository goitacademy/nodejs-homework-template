export interface Options {
    env?: Record<string, string | undefined>;
    includeNodeCertificates?: boolean;
    asyncFallbackError?: Error;
}
export declare function systemCertsSync(opts?: Options): string[];
export declare function systemCertsAsync(opts?: Options): Promise<string[]>;
