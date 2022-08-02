"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modelUser_1 = __importDefault(require("./modelUser"));
const outerSchema_1 = __importDefault(require("./outerSchema"));
const User = {
    model: modelUser_1.default,
    outerSchema: outerSchema_1.default
};
exports.default = User;
