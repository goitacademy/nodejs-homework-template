const errorMessageList = {
    400: 'Помилка від Joi або іншої бібліотеки валідації',
    401: 'Email or password is wrong',
    403: 'Forbiden',
    404: 'Not found',
    409: 'Email in use',
};

const HttpError = (status, message = errorMessageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

module.exports = HttpError;
