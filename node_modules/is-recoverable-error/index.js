"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const acorn_static_class_features_1 = __importDefault(require("acorn-static-class-features"));
const acorn_numeric_separator_1 = __importDefault(require("acorn-numeric-separator"));
const acorn_private_methods_1 = __importDefault(require("acorn-private-methods"));
const acorn_class_fields_1 = __importDefault(require("acorn-class-fields"));
const acorn_1 = require("acorn");
module.exports = function isRecoverableError(code) {
    if (/^\s*\{/.test(code) && isRecoverableError(`(${code}`))
        return true;
    let recoverable = false;
    const RecoverableParser = acorn_1.Parser
        .extend(acorn_private_methods_1.default, acorn_class_fields_1.default, acorn_numeric_separator_1.default, acorn_static_class_features_1.default, (AcornParser) => {
        return class extends AcornParser {
            nextToken() {
                super.nextToken();
                if (this.type === acorn_1.tokTypes.eof)
                    recoverable = true;
            }
            raise(pos, message) {
                switch (message) {
                    case 'Unterminated template':
                    case 'Unterminated comment':
                        recoverable = true;
                        break;
                    case 'Unterminated string constant': {
                        const token = this.input.slice(this.lastTokStart, this.pos);
                        if (/\\(?:\r\n?|\n|\u2028|\u2029)$/.test(token)) {
                            recoverable = true;
                        }
                    }
                }
                super.raise(pos, message);
            }
        };
    });
    try {
        RecoverableParser.parse(code, { ecmaVersion: 11 });
        return false;
    }
    catch (e) {
        return recoverable;
    }
};
