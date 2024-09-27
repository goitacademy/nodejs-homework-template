const HttpError = (status, message) => {
    const error = Error(message);
    error.status = status;
    return error;
};

module.exports = HttpError;