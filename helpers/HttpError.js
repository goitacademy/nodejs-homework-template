const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    console.log(status);
    return error;
}

module.exports = HttpError;