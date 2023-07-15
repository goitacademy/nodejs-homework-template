declare type Address = {
    name: string;
    port: number;
};
declare type Options = {
    dns?: {
        resolveSrv(hostname: string, cb: (err: Error | undefined | null, addresses: Address[] | undefined) => void): void;
        resolveTxt(hostname: string, cb: (err: Error | undefined | null, addresses: string[][] | undefined) => void): void;
    };
};
declare function resolveMongodbSrv(input: string, options?: Options): Promise<string>;
export = resolveMongodbSrv;
