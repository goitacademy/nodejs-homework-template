const messages = {
    400: 'missing required name field',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    409: 'Conflikt'
}

const HttpError = (status, message = messages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpError;