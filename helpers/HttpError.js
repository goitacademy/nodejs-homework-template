const messages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict"
}

const HttpError = (status, message = messages[status]) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
}

module.exports = HttpError;