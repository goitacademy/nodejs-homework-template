"use strict"
interface IErrorType {
    [key: string]: string,
}
const messages: IErrorType = {
    400: "Bad request",
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    408: 'Request Timeout',
    409: 'Conflict',
}


interface IError {
    message: string | undefined,
    status?: string | undefined
}

export const createError = (status: string, message: string = messages[status]) => {
    const error: IError = new Error(message);
    error.status = status;
    return error;
}

