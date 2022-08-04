"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorMessages_1 = __importDefault(require("./errorMessages"));
const createError = ({ status, messageProd = errorMessages_1.default[status], messageDev = messageProd, nodeEnv = 'production', }) => {
    let message = '';
    if (nodeEnv === 'production') {
        message = messageProd;
    }
    if (nodeEnv === 'development') {
        message = messageDev;
        console.log(message);
    }
    const error = new Error(message);
    error.status = status;
    return error;
};
exports.default = createError;
