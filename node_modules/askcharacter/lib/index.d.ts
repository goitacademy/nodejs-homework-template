/// <reference types="node" />
import type { Readable, Writable } from 'stream';
import type { ReadStream } from 'tty';
declare type Options = {
    input?: Readable | ReadStream;
    output?: Writable;
};
declare const _default: (arg1: Readable | ReadStream | Options) => Promise<string>;
export = _default;
