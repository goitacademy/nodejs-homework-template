"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const hijack_stream_1 = __importDefault(require("hijack-stream"));
const util_1 = require("util");
class CancelError extends Error {
    constructor() {
        super('The request was aborted by the user');
    }
    get code() {
        return 'ECANCELED';
    }
}
function askCharacterImpl(streamOrOptions, callback) {
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
            var _a;
            let char = '';
            let length = 0;
            if (typeof input === 'string') {
                if (input.length === 0)
                    return;
                length = input.codePointAt(0) >= 0x10000 ? 2 : 1;
                char = input.slice(0, length);
                restore(input.slice(length));
            }
            else {
                buf = Buffer.concat([buf, input]);
                if ((buf[0] & 0xc0) !== 0xc0)
                    length = 1;
                else if ((buf[0] & 0xe0) === 0xc0)
                    length = 2;
                else if ((buf[0] & 0xf0) === 0xe0)
                    length = 3;
                else if ((buf[0] & 0xf8) === 0xf0)
                    length = 4;
                else if ((buf[0] & 0xfc) === 0xf8)
                    length = 5;
                else
                    length = 6;
                if (buf.length < length)
                    return;
                char = buf.toString('utf8', 0, length);
                restore(buf.slice(length));
            }
            (_a = options.output) === null || _a === void 0 ? void 0 : _a.write(char);
            if (isTTY && (char === '\u0003' || char === '\u0004')) {
                callback(new CancelError());
            }
            else {
                callback(null, char);
            }
        },
        onend(err) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, '');
            }
        }
    });
}
module.exports = util_1.promisify(askCharacterImpl);
//# sourceMappingURL=index.js.map