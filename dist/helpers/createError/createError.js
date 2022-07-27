"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorMessages_1 = __importDefault(require("./errorMessages"));
const createError = (status, message = errorMessages_1.default[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
};
exports.default = createError;
