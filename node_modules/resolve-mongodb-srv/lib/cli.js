"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
(async () => {
    process.stdout.write(await (0, _1.default)(`${process.argv[2]}`) + '\n');
})().catch(err => process.nextTick(() => { throw err; }));
//# sourceMappingURL=cli.js.map