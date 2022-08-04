"use strict";
// export { default } from './Auth';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCurrent_1 = __importDefault(require("./getCurrent"));
const login_1 = __importDefault(require("./login"));
const signup_1 = __importDefault(require("./signup"));
const ctrls = {
    signup: signup_1.default,
    login: login_1.default,
    getCurrent: getCurrent_1.default,
};
exports.default = ctrls;
