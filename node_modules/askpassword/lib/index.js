"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const hijack_stream_1 = __importDefault(require("hijack-stream"));
const handle_backspaces_1 = __importDefault(require("handle-backspaces"));
const util_1 = require("util");
class CancelError extends Error {
    constructor() {
        super('The request was aborted by the user');
    }
    get code() {
        return 'ECANCELED';
    }
}
function askPasswordImpl(streamOrOptions, callback) {
    let input;
    let options;
    if ('input' in streamOrOptions) {
        input = streamOrOptions.input;
        options = streamOrOptions;
    }
    else {
        input = streamOrOptions;
        options = {};
    }
    let buf = Buffer.alloc(0);
    const isTTY = 'isTTY' in input && input.isTTY;
    const { restore } = hijack_stream_1.default({
        stream: input,
        ondata(input) {
            const prevLength = buf.length;
            if (typeof input === 'string') {
                buf += input;
            }
            else {
                buf = Buffer.concat([buf, input]);
            }
            buf = handle_backspaces_1.default(buf);
            const stops = ['\r', '\n'].concat(isTTY ? ['\u0003', '\u0004'] : []);
            let stopIndex = buf.length;
            let stopChar;
            for (const stop of stops) {
                const index = buf.indexOf(stop);
                if (index !== -1 && index < stopIndex) {
                    stopIndex = index;
                    stopChar = stop;
                }
            }
            const addedLength = stopIndex - prevLength;
            if (options.output && options.replacementCharacter) {
                if (addedLength > 0) {
                    options.output.write(options.replacementCharacter.repeat(addedLength));
                }
                else if (addedLength < 0) {
                    options.output.write('\u0008 \u0008'.repeat(-addedLength));
                }
            }
            if (stopIndex === buf.length)
                return;
            const result = buf.slice(0, stopIndex);
            buf = buf.slice(stopIndex + 1);
            restore(buf);
            if (stopChar === '\r' || stopChar === '\n') {
                callback(null, result);
            }
            else {
                callback(new CancelError());
            }
        },
        onend(err) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, buf);
            }
        }
    });
}
module.exports = util_1.promisify(askPasswordImpl);
//# sourceMappingURL=index.js.map