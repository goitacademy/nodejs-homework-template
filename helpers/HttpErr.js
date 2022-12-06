const messages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    409: "Conflict"
}

const HttpErr = (status, message = messages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpErr;