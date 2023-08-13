const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    // console.log('ERROR',error.status);
    return error;
}

module.exports = HttpError;