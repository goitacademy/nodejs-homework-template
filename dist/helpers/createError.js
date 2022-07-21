"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const messages = {
    400: "Bad request",
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    408: 'Request Timeout',
    409: 'Conflict',
};
const createError = (status, message = messages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
};
exports.createError = createError;
