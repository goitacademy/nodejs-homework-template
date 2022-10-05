const messages = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
};

const RequestError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

module.exports = RequestError;
