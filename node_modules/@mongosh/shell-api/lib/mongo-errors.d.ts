import type { ShellPlugin } from './';
export declare function rephraseMongoError(error: any): any;
export declare class TransformMongoErrorPlugin implements ShellPlugin {
    transformError(err: Error): Error;
}
