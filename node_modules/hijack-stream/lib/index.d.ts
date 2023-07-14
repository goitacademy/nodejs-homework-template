/// <reference types="node" />
import type { Readable } from 'stream';
import type { ReadStream } from 'tty';
declare type Options = {
    stream: Readable | ReadStream;
    ondata: (chunk: Buffer | string) => void;
    onend: (err: null | Error) => void;
    ttyRawMode?: boolean;
};
interface StreamController {
    restore(unshiftData?: Buffer | string): void;
}
declare function hijackStream(options: Options): StreamController;
export = hijackStream;
