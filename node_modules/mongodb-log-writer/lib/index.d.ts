/// <reference types="node" />
import { Writable } from 'stream';
declare type PlainWritable = Pick<Writable, 'write' | 'end'>;
export interface MongoLogId {
    __value: number;
}
export declare function mongoLogId(id: number): MongoLogId;
export interface MongoLogEntry {
    t?: Date;
    s: 'F' | 'E' | 'W' | 'I' | 'D1' | 'D2' | 'D3' | 'D4' | 'D5';
    c: string;
    id: MongoLogId;
    ctx: string;
    msg: string;
    attr?: any;
}
export declare class MongoLogWriter extends Writable {
    _logId: string;
    _logFilePath: string | null;
    _target: PlainWritable;
    _now: () => Date;
    constructor(logId: string, logFilePath: string | null, target: PlainWritable, now?: () => Date);
    get logId(): string;
    get logFilePath(): string | null;
    get target(): PlainWritable;
    _write(info: MongoLogEntry, encoding: unknown, callback: (err?: Error | null | undefined) => void): void;
    _final(callback: (err?: Error | null | undefined) => void): void;
    flush(): Promise<void>;
    info(component: string, id: MongoLogId, context: string, message: string, attr?: unknown): void;
    warn(component: string, id: MongoLogId, context: string, message: string, attr?: unknown): void;
    error(component: string, id: MongoLogId, context: string, message: string, attr?: unknown): void;
    fatal(component: string, id: MongoLogId, context: string, message: string, attr?: unknown): void;
    debug(component: string, id: MongoLogId, context: string, message: string, attr?: unknown, level?: 1 | 2 | 3 | 4 | 5): void;
    bindComponent(component: string): {
        unbound: MongoLogWriter;
        component: string;
        write(entry: Omit<MongoLogEntry, 'c'>, cb?: (error?: Error | null) => void): boolean;
        info(id: MongoLogId, context: string, message: string, attr?: unknown): void;
        warn(id: MongoLogId, context: string, message: string, attr?: unknown): void;
        error(id: MongoLogId, context: string, message: string, attr?: unknown): void;
        fatal(id: MongoLogId, context: string, message: string, attr?: unknown): void;
        debug(id: MongoLogId, context: string, message: string, attr?: unknown, level?: 1 | 2 | 3 | 4 | 5): void;
    };
    mongoLogId: typeof mongoLogId;
}
interface MongoLogOptions {
    directory: string;
    gzip?: boolean;
    retentionDays: number;
    maxLogFileCount?: number;
    onerror: (err: Error, path: string) => unknown | Promise<void>;
    onwarn: (err: Error, path: string) => unknown | Promise<void>;
}
export declare class MongoLogManager {
    _options: MongoLogOptions;
    constructor(options: MongoLogOptions);
    cleanupOldLogfiles(maxDurationMs?: number): Promise<void>;
    createLogWriter(): Promise<MongoLogWriter>;
}
export {};
