const messages = {
    400: 'Bad request',
    401: 'Unautorized',
    403: 'Forbbiden',
    404: 'Not found',
    409: 'Conflict',
}

const RequestError = (status, messge = messages[status]) => {
    const error = new Error(messge);
    error.status = status;
    return error;
}

module.exports = RequestError;