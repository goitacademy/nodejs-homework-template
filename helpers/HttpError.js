const HttpError = (status, message) => {
    const error = new Error(message);
    error.starus = status;
    return error;
};

module.exports = HttpError;